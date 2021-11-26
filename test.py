import random

w = 10
h = 10
grid = []
for row in range(0,h):
    grid.append([]);
    for col in range(0,w):
        if(random.randint(0,1) == 1):
            grid[row].append(int(random.randint(0,1)));
        else:
            grid[row].append(0);

for row in grid:
    print(row)

def getRegionSize(matrix: list, row: int, col: int):
    if(row < 0 or col < 0 or row >= len(matrix) or col >= len(matrix[row])):
        return 0
    if(matrix[row][col] == 0):
        return 0
    __size = 1
    matrix[row][col] = 0
    for r in range(row-1,row+1):
        for c in range(col-1,col+1):
            if r != row or c != col:
                __size += getRegionSize(matrix, r, c)
    return __size

for row in range(len(grid)):
    for col in range(len(grid[row])):
        print(getRegionSize(grid, row, col))

for row in grid:
    print(row)
