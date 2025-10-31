import React, { useState, useEffect, useRef } from 'react';
import { Select } from '@douyinfe/semi-ui';
import { OptionProps } from '@douyinfe/semi-ui/lib/es/select';
import { bitable as bitableSdk, FieldType } from '@lark-base-open/js-sdk';
import { useTranslation } from 'react-i18next';

interface CategorySelectorProps {
    onChange: (type: string) => void;
    defaultSection: string | null;
    tableId: string | null;
    viewId: string | null;
    availableFieldTypes?: FieldType[];
    bitable: typeof bitableSdk | null;
}

export function CategorySelector(props: CategorySelectorProps) {
    const [optionList, setOptionList] = useState<OptionProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    let { t } = useTranslation();
    let { onChange, defaultSection, bitable, tableId, viewId, availableFieldTypes } = props;
    useEffect(() => {
        async function fetchCategoryData() {
            if (tableId == null || viewId == null || !bitable) return;
            setLoading(true);
            const categoryList = await (await (await bitable.base?.getTableById(tableId))?.getViewById(viewId))?.getFieldMetaList() || [];
            const options = categoryList.map(async (category) => {
                const name = category.name;
                if (availableFieldTypes && !availableFieldTypes.includes(category.type)) {
                    
                    return { value: category.id, label: name, disabled: true };
                }
                return { value: category.id, label: name };
            });

            // 等待所有getName调用完成
            const resolvedOptions = await Promise.all(options);
            setOptionList(resolvedOptions);
            setLoading(false);
        }

        fetchCategoryData();
    }, [tableId, viewId, bitable]); // 空依赖数组意味着这个effect只会在组件挂载后运行一次

    const [section, setSection] = useState(String(defaultSection));
    useEffect(() => {
        setSection(String(defaultSection))
    }, [defaultSection])
    function changeHandle(r: string | number | any[] | Record<string, any> | undefined) {
        r = r as string
        onChange(r)
    }
    defaultSection = defaultSection == null ? '' : defaultSection
    return (
        <Select
            placeholder={t("label.display.select.category")}
            style={{ width: 300 }}
            optionList={optionList}
            onChange={changeHandle}
            value={section}
            loading={loading}
        />
    );
}