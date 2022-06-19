import psycopg2

# Connect to the aws database server
postgresConnection    = psycopg2.connect(
    database = "palatable",
    user = "postgres",
    password = "comp3900",
    host = "database-1.c0wxxqc8ue6o.us-west-1.rds.amazonaws.com",
    port = '5432'
)

# Cursor for connection
cursor = postgresConnection.cursor()

# Create table statement
create_table = "create table test (id int primary key, name varchar(30), des varchar(50));"
cursor.execute(create_table)

# Insert Into
insert_into = """INSERT INTO test (id, name, des) VALUES (%s,%s,%s)"""
record = (150, 'Name', 'Text')
record2 = (151, 'Name1', 'Text2')
record3 = (152, 'Name2', 'Text3')
record4 = (153, 'Name3', 'Text4')
cursor.execute(insert_into, record)
cursor.execute(insert_into, record2)
cursor.execute(insert_into, record3)
cursor.execute(insert_into, record4)
postgresConnection.commit()

# Select * From
select_from = "SELECT * FROM test;"
cursor.execute(select_from)
tables = cursor.fetchall()

# Print entries
for table in tables:
    print(table)

# Drop table
drop_table = "drop table test;"
cursor.execute(drop_table)
postgresConnection.commit()