-- CreateTable
CREATE TABLE "employees" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "position" VARCHAR(50) NOT NULL,
    "start_date" DATE NOT NULL,
    "work_time" TIME(6) NOT NULL,
    "hours_per_day" INTEGER NOT NULL,
    "work_schedule" VARCHAR(50) NOT NULL,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);
