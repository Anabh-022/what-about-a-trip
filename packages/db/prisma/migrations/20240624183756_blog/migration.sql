-- CreateTable
CREATE TABLE "blog" (
    "blog_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "blog_pkey" PRIMARY KEY ("blog_id")
);

-- AddForeignKey
ALTER TABLE "blog" ADD CONSTRAINT "blog_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
