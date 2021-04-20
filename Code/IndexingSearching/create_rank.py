import csv
from collections import defaultdict, Counter


def getPostWiseSymptoms():
    file = 'SympGraph_Symptoms.csv'

    rank_dict = defaultdict(list)
    final_list = defaultdict()
    with open(file) as f:
        reader = csv.reader(f)
        data = [r for r in reader]
        for row in data:
            source_post_number = row[0]
            destination_post_number = row[1]
            count = int(float(row[2]))
            while count:
                rank_dict[source_post_number].append(destination_post_number)
                count -= 1
            final_list[source_post_number] = Counter(
                rank_dict[source_post_number])
    return final_list

# if __name__ == "__main__":
#     ranked_list = getPostWiseSymptoms()
#     print(ranked_list)
