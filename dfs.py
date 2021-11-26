import random
w = 18*2
h = 8*2

fill_symbol = " "
draw_symbol = 2

directions = [
    [ 0, 1],
    [ 1, 0],
    [ 0,-1],
    [-1, 0],
    [ 1, 1],
    [-1, 1],
    [-1,-1],
    [ 1,-1]
]

grid = []
for row in range(0,h):
    grid.append([]);
    for col in range(0,w):
        if(random.randint(0,3) == 1):
            grid[row].append(draw_symbol);
        else:
            grid[row].append(fill_symbol);

def printGrid(g):
    for row in g:
        s = ""
        for col in row:
            s+=str(col)
        print(s)

def removeLoners(matrix, row, col):
    if matrix[row][col] != draw_symbol:
        return
    for i in directions:
        try:
            if matrix[row+i[0]][col+i[1]] != fill_symbol:
                return
        except:
            matrix[row][col] = fill_symbol
            return
    matrix[row][col] = fill_symbol
        

for row in range(len(grid)):
    for col in range(len(grid[row])):
        removeLoners(grid, row, col)

printGrid(grid)
print("-"*w)

def dfs(matrix, row, col):
    if row < 0 or col < 0 or row >= h or col >= w:
        return 0
    if matrix[row][col] == fill_symbol:
        return 0
    __size = [(row,col)]
    matrix[row][col] = fill_symbol
    for i in directions:
        arr = dfs(matrix, row+i[0], col+i[1])
        if arr != 0:
            for a in arr:
                __size.append(a)
    return __size

longest_arr = []
for row in range(len(grid)):
    for col in range(len(grid[row])):
        arr = dfs(grid, row, col)
        if arr != 0:
            if len(arr) > len(longest_arr):
                longest_arr = arr

for row in range(len(grid)):
    for col in range(len(grid[row])):
        if (row,col) in longest_arr:
            grid[row][col] = draw_symbol
        else:
            grid[row][col] = fill_symbol

printGrid(grid)