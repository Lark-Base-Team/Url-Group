import { Avatar, Button, ButtonGroup, List, Space, Skeleton } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { base, dashboard, bitable, IAttachmentField, FieldType } from '@lark-base-open/js-sdk';
import { toMinText, toNormalText } from "../../utils";
import './grid.scss'
import { TFunction } from "i18next";
interface IUrlGroupConfig {
    type: 'grid' | 'row',
    table: string | null,
    view: string | null,
    titleRow: string | null,
    iconRow: string | null,
    linkRow: string | null
}
interface IViewerData {
    text: string,
    icon: string,
    link: string
}
export function GridViewer(props: {
    config: IUrlGroupConfig,
    trans: TFunction<"translation", undefined>
}) {
    let [data, setData] = useState<IViewerData[]>([])
    const [light, setIsLight] = useState(true);
    useEffect(() => {
        dashboard.getTheme().then((res) => {
            setIsLight(res.theme.toLocaleLowerCase() === 'light');
        })
      
        dashboard.onThemeChange((res) => {
            setIsLight(res.data.theme.toLocaleLowerCase() === 'light');
        })
    }, [])
    async function fetchData() {
        let data: IViewerData[] = []
        if (props.config.table == null) {
            return
        }
        let table = await bitable.base.getTableById(props.config.table!)
        let recordList = await (async (table: any) => {
            let recordIdData;
            let token = undefined as any;
            // setLoading(true);
            const recordIdList = []
            do {
                recordIdData = await table.getRecordListByPage(token ? { pageToken: token, pageSize: 200 } : { pageSize: 200 });
                
                token = recordIdData.pageToken;
                
                // setLoadingTip(`${((token > 200 ? (token - 200) : 0) / recordIdData.total * 100).toFixed(2)}%`)
                recordIdList.push(...recordIdData.records.recordList)
        
            } while (recordIdData.hasMore);
            // setLoading(false);
            return recordIdList
        })(table);
        for (let record of recordList) {
            console.log(record);
            
            const title_cell = await (await table.getFieldById(props.config.titleRow!)).getCell(record.recordId)
            const title = await title_cell.getValue();
            const icon_cell = await (await table.getFieldById(props.config.iconRow!)).getCell(record.recordId)
            let icon_field = await (
                await bitable.base.getTableById(props.config.table!)
            ).getFieldById(props.config.iconRow!)
            let icon_type = await (
                icon_field
            ).getType()
            let icon = [{
                text: ""
            }]
            if (icon_type == FieldType.Attachment) {
                try {
                    let urls = await (icon_field as IAttachmentField).getAttachmentUrls(record.recordId)
                    icon = [{
                        text: urls[0]
                    }]
                } catch (e) {
                    console.warn("Failed to fetch icon")
                }
            }
            else {
                icon = await icon_cell.getValue();
            }

            if (!Array.isArray(icon) && !Array.isArray(title)) {
                continue
            }
            const link_cell = await (await table.getFieldById(props.config.linkRow!)).getCell(record.recordId)
            let link_field = await (
                await bitable.base.getTableById(props.config.table!)
            ).getFieldById(props.config.linkRow!)
            let link_type = await (
                link_field
            ).getType()
            let link = [{
                text: ""
            }]
            if (link_type == FieldType.Attachment) {
                try {
                    let urls = await (link_field as IAttachmentField).getAttachmentUrls(record.recordId)
                    link = [{
                        text: urls[0]
                    }]
                } catch (e) {
                    console.warn("Failed to fetch link")
                }
            }
            else {
                link = await link_cell.getValue();
            }
            data.push({
                text: toNormalText(title),
                icon: toNormalText(icon/*,"icon"*/),
                link: toNormalText(link)
            })
        }
        setData(data)

    }

    useEffect(() => {

        fetchData();


    }, [props]); // 空依赖数组意味着这个effect只会在组件挂载后运行一次
    useEffect(() => {
        const update = dashboard.onConfigChange(() => {
            fetchData()
        });
        return () => {
            update();
        }
    }, []);
    const placeholder = (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyItems: 'center', rowGap: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', columnGap: '40px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', columnGap: '40px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', columnGap: '40px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyItems: "center",
                    flexDirection: "column"
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
            </div>
        </div>
    );

    return (

        <div style={{ width: "100vw", height: "100vh", display: "grid", justifyItems: "center", alignContent: "center" }}>
            <List
                style={{ width: "100%" }}
                emptyContent={<Skeleton placeholder={placeholder} loading={true} active></Skeleton>}
                grid={{
                }}
                dataSource={data}
                renderItem={item => (
                    <List.Item onClick={() => { window.open(item.link) }} style={{ width: "100%", display: "grid", justifyItems: "center" }}>
                        <Space vertical style={{ cursor: "pointer", width: "100%", display: "grid", justifyItems: "center" }}>
                            <Avatar shape="square" style={{ borderRadius: 12 }} src={item.icon}></Avatar>
                            <p style={{ color: light ? 'black' : 'white' }}>{toMinText(8, item.text)}</p>
                        </Space>
                    </List.Item>
                )}
            />
        </div>

    )
}