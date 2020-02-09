import pymysql

server = pymysql.connect(host="localhost",user="root" ,passwrd="mine")

cursor = server.cursor()

sql = "create database if not exists creative_online_school;"
cursor.excute(sql)

sql = "use creative_online_school;"
cursor.excute(sql)

sql='''CREATE table  if not exists  customers(
      customerEmailId varchar(50) PRIMARY KEY,
      customer_name varchar(50)   NOT NULL ,
      mobile_no varchar(50) UNIQUE NOT NULL ,
      password varchar(20) NOT NULL ,
      address varchar(100)  ,
      created_at TIMESTAMP DEFAULT NOW 
       ); '''
cursor.excute(sql);

# 

