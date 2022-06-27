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

# Recipe id, change this to search other recipes (Currently theres only one: 101)
recipe_id = 101

# Getting recipe name and contributor
select_from = """
SELECT r.name, r.type, u.f_name, u.l_name
FROM recipes r
JOIN users u ON r.contributor = u.id
WHERE r.id = %s;
"""
cursor.execute(select_from, [recipe_id])
table = cursor.fetchone()
if not table:
    print("Recipe not found")
else:
    print(f"Recipe Name: {table[0]}")
    print(f"Recipe Type: {table[1]}")
    print(f"Contributed by: {table[2]} {table[3]}")

    # Getting ingredients
    select_from = """
    SELECT i.name, ir.amount, ir.unit 
    FROM ingre_recipe ir
    JOIN recipes r ON ir.recipe = r.id
    JOIN ingredients i ON ir.ingredient = i.id 
    WHERE r.id = %s;
    """
    cursor.execute(select_from, [recipe_id])
    tables = cursor.fetchall()
    print('\nIngredients:')
    for table in tables:
        print(f'{table[1]} {table[2]} {table[0]}')

    # Getting recipe details
    select_from = """
    SELECT rd.step_number, rd.description
    FROM recipe_details rd 
    JOIN recipes r ON rd.recipe = r.id 
    WHERE r.id = %s;
    """
    cursor.execute(select_from, [recipe_id])
    tables = cursor.fetchall()
    print('\nDetails:')
    for table in tables:
        print(f'Step {table[0]}: {table[1]}')