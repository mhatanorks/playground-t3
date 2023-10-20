import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";

export const postRouter = createTRPCRouter({
  // 記事一覧の取得
  getAllBlogs: publicProcedure.query(() => {
    return db.post.findMany();
  }),

  // 記事の投稿
  postBlog: publicProcedure
    .input(
      z.object({
        title: z.string().max(40),
        description: z.string(),
      }),
    )
    .mutation((req) => {
      const postBlog = db.post.create({
        data: {
          title: req.input.title,
          description: req.input.description,
        },
      });
      return postBlog;
    }),

  // 詳細記事の取得
  getDetailBlog: publicProcedure
    .input(z.object({ id: z.number() }))
    .query((req) => {
      return db.post.findUnique({ where: { id: req.input.id } });
    }),
  // 記事の削除
  deleteBlog: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation((req) => {
      return db.post.delete({ where: { id: req.input.id } });
    }),
  // create: publicProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ ctx, input }) => {
  //     // simulate a slow db call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     return ctx.db.post.create({
  //       data: {
  //         name: input.name,
  //       },
  //     });
  //   }),

  // getLatest: publicProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //   });
  // }),
});
