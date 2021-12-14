def set_num(arg):
    """
    возвращает замену номеру договора если таковой отсутствует
    @param arg str
    @return: string
    """
    return f'ID: {arg}'


def get_type_ks(val):
    tp = [
        {
            'label': 'Не указан',
            'value': None,
        },
        {
            'label': 'КС',
            'value': 'ks',
        },
        {
            'label': 'Акт',
            'value': 'act',
        },
        {
            'label': 'Иное',
            'value': 'other',
        },
    ]
    return [ num for num in tp if num['value'] == val ][0]['label']
