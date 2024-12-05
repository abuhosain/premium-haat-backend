import { PrismaClient, Prisma } from "@prisma/client";
import { PaginationHelpers } from "./paginationHelpers";
import { IPaginationOptions } from "../interfaces/paginaton";

const prisma = new PrismaClient();

interface IQueryBuilderOptions {
  model: keyof PrismaClient;
  filters: any;
  pagination: IPaginationOptions;
  include?: Prisma.UserInclude;
}

const buildPrismaQuery = async (options: IQueryBuilderOptions) => {
  const { model, filters = {}, pagination, include } = options;
  const { limit, page, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(pagination);

  const andConditions = Object.keys(filters).map((key) => ({
    [key]: { equals: filters[key] },
  }));

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

  return {
    meta: { total, totalPages, page, limit },
    data: result,
  };
};

export default buildPrismaQuery;
