-- CreateTable
CREATE TABLE "chatRoom" (
    "chatId" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chatRoom_pkey" PRIMARY KEY ("chatId")
);

-- AddForeignKey
ALTER TABLE "chatRoom" ADD CONSTRAINT "chatRoom_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
