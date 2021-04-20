from create_rank import getPostWiseSymptoms

symptom_dict = dict()

symptom_dict = getPostWiseSymptoms()


# sym = ['organic disorders', 'Other symptoms', 'organic disorders', 'Coronavirus Infections', 'Disease', 'Other symptoms', 'Severe Acute Respiratory Syndrome', 'Pulmonary Fibrosis', 'Influenza', 'Dengue Fever', 'Chills', 'Severe Acute Respiratory Syndrome', 'Pulmonary Emphysema', 'Pulmonary Fibrosis', 'Influenza', 'BODY ACHE']


def refine_filters(list1):
    print(len(symptom_dict.keys()))

    symptom_set = set(list1)

    refined_symptom_list = list()

    for symptom in symptom_set:
        if symptom not in symptom_dict.keys():
            continue
        for item in symptom_set:
            if item == symptom:
                continue
            if symptom_dict[symptom][item] > 27:
                continue
            if symptom_dict[symptom][item] != 0:
                refined_symptom_list.append(
                    (symptom, item, symptom_dict[symptom][item]))

    sorted(refined_symptom_list)
    sorted_refined_symptom_list = sorted(
        refined_symptom_list, key=lambda i: i[2], reverse=True)

    refined_filter_set = set()

    for item in sorted_refined_symptom_list:

        if len(refined_filter_set) >= 6:
            break
        if item[0] != 'Disease':
            refined_filter_set.add(item[0])
        if item[1] != 'Disease':
            refined_filter_set.add(item[1])

    refined_filter_set_list = list(refined_filter_set)

    return refined_filter_set_list
