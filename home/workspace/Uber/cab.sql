
-- DROP DATABASE cab_management_system ;
-- CREATE DATABASE cab_management_system ;
-- USE cab_management_system ;
-- CREATE table customers(
--       customerEmailId varchar(50) PRIMARY KEY,
--       customer_name varchar(50)   NOT NULL ,
--       mobile_no varchar(50) UNIQUE NOT NULL ,
--       password varchar(20) NOT NULL ,
--       address varchar(100)  ,
--       created_at TIMESTAMP DEFAULT NOW() 
--        );





CREATE table drivers(
      driverEmailId varchar(50) PRIMARY KEY,
      driver_name varchar(50)   NOT NULL ,
      driver_mobile_no varchar(50) UNIQUE NOT NULL ,
      driver_password varchar(20) NOT NULL ,
      address varchar(100)  ,
      license_No varchar(20) UNIQUE NOT NULL  ,
      bank_Account varchar(20) UNIQUE NOT NULL ,
      cab_type   varchar(20) NOT NULL,
      car_no varchar(20) UNIQUE NOT NULL ,
      driver_created_at TIMESTAMP DEFAULT NOW() 
       );