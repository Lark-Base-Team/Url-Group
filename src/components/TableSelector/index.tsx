import React, { useState, useEffect, useRef } from 'react';
import { Select } from '@douyinfe/semi-ui';
import { OptionProps } from '@douyinfe/semi-ui/lib/es/select';
import { bitable } from '@lark-base-open/js-sdk';
import { useTranslation } from 'react-i18next';

interface TableSelectorProps {
    onChange: (type: string) => void;
    defaultSection: string | null;
    bitable: typeof bitable | null;
}

export function TableSelector(props: TableSelectorProps) {
    const { bitable, onChange } = props;

    const [optionList, setOptionList] = useState<OptionProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    let { t } = useTranslation();
    useEffect(() => {
        async function fetchTableData() {
            if (!bitable) {
                return;
            }
            setLoading(true);
            const tableList = (await bitable.base?.getTableMetaList()) || [];
            const options = tableList.map(async (table) => {
                const name = table.name;
                return { value: table.id, label: name };
            });

            // 等待所有getName调用完成
            const resolvedOptions = await Promise.all(options);
            setOptionList(resolvedOptions);
            setLoading(false);
        }

        fetchTableData();
    }, [bitable]); // 空依赖数组意味着这个effect只会在组件挂载后运行一次

    let { defaultSection } = props;
    const [section, setSection] = useState(String(defaultSection));
    useEffect(()=>{
        setSection(String(defaultSection))
    }, [defaultSection])
    function changeHandle(r: string | number | any[] | Record<string, any> | undefined){
        r = r as string
        onChange(r)
    }
    defaultSection = defaultSection == null ? '' : defaultSection
    return (
        <Select
            placeholder={t("label.display.select.table")}
            style={{ width: 300 }}
            optionList={optionList}
            onChange={changeHandle}
            value={section}
            loading={loading}
        />
    );
}