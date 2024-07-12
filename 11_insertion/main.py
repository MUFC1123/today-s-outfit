from typing import List
# リストは[5, 3, 8, 4, 2]だと仮定する

def insertion_sort(numbers: List[int]) -> List[int]:
    len_numbers = len(numbers)
    for i in range(1, len_numbers):
        temp = numbers[i]
        j = i - 1

        while j >= 0 and numbers[j] > temp:  
            # 最初の動作だと５＞３
            numbers[j + 1] = numbers[j]
            # numbers[j] の要素を numbers[j + 1] の位置にコピー
            # [5, 5, 8, 4, 2]
            j = j - 1
            # jを-1にすることでループを抜けられる。
            # indexが-1になった5の値は一時的にリストの他の位置にシフトされています。

        numbers[j + 1] = temp
            #  [j + 1] = index=0
    return numbers


if __name__ == '__main__':
    import random
    nums = [random.randint(0, 1000) for _ in range(10)]
    print(insertion_sort(nums))
