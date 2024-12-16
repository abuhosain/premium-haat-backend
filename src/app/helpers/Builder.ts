import { PrismaClient, Prisma } from "@prisma/client";
import { IPaginationOptions } from "../interfaces/paginaton";
import { PaginationHelpers } from "./paginationHelpers";
 

const prisma = new PrismaClient();

interface IQueryBuilderOptions {
  model: keyof PrismaClient;
  filters?: any;
  pagination: IPaginationOptions;
  include?: any;
}

const buildPrismaQuery = async (options: IQueryBuilderOptions) => {
  const { model, filters = {}, pagination, include } = options;
  const { limit, page, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(pagination);

  const andConditions: any[] = [];

  // Handle the case where a search term is provided
  if (filters.searchTerm) {
    andConditions.push({
      OR: [
        { title: { contains: filters.searchTerm, mode: "insensitive" } },
        { description: { contains: filters.searchTerm, mode: "insensitive" } },
      ],
    });
  }

  // Handle price range filtering for `product` model
  if (model === "product") {
    if (filters.minPrice) {
      andConditions.push({
        price: { gte: +filters.minPrice },
      });
    }
    if (filters.maxPrice) {
      andConditions.push({
        price: { lte: +filters.maxPrice },
      });
    }
  }

  // Map other filters into Prisma's AND conditions
  Object.keys(filters).forEach((key) => {
    if (key !== "searchTerm" && key !== "minPrice" && key !== "maxPrice") {
      andConditions.push({
        [key]: { equals: filters[key] },
      });
    }
  });

  const whereConditions =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const queryOptions: Prisma.UserFindManyArgs = {
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortOrder || "asc" } : undefined,
    include,
  };

  const result = await (prisma[model] as any).findMany(queryOptions);
  const total = await (prisma[model] as any).count({ where: whereConditions });
  const totalPages = Math.ceil(total / limit);

  let computedResults = result;

  // Only compute avgRating and totalSale if the model is `product`
  if (model === "product") {
    computedResults = result.map((item: any) => {
      const avgRating =
        item.review?.length > 0
          ? item.review.reduce((sum: number, rev: any) => sum + rev.rating, 0) /
            item.review.length
          : 0;

      const totalSale =
        item.orderItem?.length > 0
          ? item.orderItem.reduce(
              (sum: number, order: any) => sum + order.quantity,
              0
            )
          : 0;

      return {
        ...item,
        avgRating,
        totalSale,
      };
    });
  }

  return {
    meta: { total, totalPages, page, limit },
    data: computedResults,
  };
};

export default buildPrismaQuery;