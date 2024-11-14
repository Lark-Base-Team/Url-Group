import { Avatar, Button, List, Skeleton } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { dashboard, bitable, FieldType, IAttachmentField } from '@lark-base-open/js-sdk';
import { toMinText, toNormalText } from "../../utils";
import './row.scss'
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
export function RowViewer(props: {
    config: IUrlGroupConfig,
    trans: TFunction<"translation", undefined>
}) {
    const [data, setData] = useState<IViewerData[]>([])
    const [light, setIsLight] = useState(true)
    useEffect(() => {
        dashboard.getTheme().then((res) => {
            setIsLight(res.theme.toLocaleLowerCase() === 'light');
        })
      
        dashboard.onThemeChange((res) => {
            setIsLight(res.data.theme.toLocaleLowerCase() === 'light');
        })
    }, [])
    async function fetchData() {
        const data: IViewerData[] = []
        if(props.config.table == null){
            return
        }
        const table = await bitable.base.getTableById(props.config.table!)
        const view = await table.getViewById(props.config.view!);
        const recordIdList = await view.getVisibleRecordIdList();
        for (const recordId of recordIdList) {
            if(!recordId){
                continue
            }
            const titleField = await table.getFieldById(props.config.titleRow!)
            const titleCell = await titleField.getCell(recordId)
            const title = await titleCell.getValue();
            const iconField = await table.getFieldById(props.config.iconRow!)
            const iconCell = await iconField.getCell(recordId)
            const iconType = await iconField.getType()
            let icon = [{text: ""}]
            if (iconType == FieldType.Attachment){
                try {
                    const urls = await (iconField as IAttachmentField).getAttachmentUrls(recordId)
                    icon = [{ text: urls[0]}]
                } catch (e) {
                    console.warn("Failed to fetch icon")
                }
            }
            else{
                icon = await iconCell.getValue();
            }
            
            if (!Array.isArray(icon) && !Array.isArray(title)){
                continue
            }
            const linkField = await table.getFieldById(props.config.linkRow!)
            const linkCell = await linkField.getCell(recordId)
            const linkType = await linkField.getType()
            let link = [{text: ""}]
            if(linkType == FieldType.Attachment){
                try {
                    const urls = await (linkField as IAttachmentField).getAttachmentUrls(recordId)
                    link = [{text: urls[0]}]
                } catch (e) {
                    console.warn("Failed to fetch link")
                }
            }
            else{
                link = await linkCell.getValue();
            }
            data.push({
                text: toNormalText(title),
                icon: toNormalText(icon),
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
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', columnGap: '30px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', columnGap: '30px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', columnGap: '30px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyItems: "center",
                    columnGap: '10px'
                }}>
                    <Skeleton.Avatar style={{ borderRadius: "10px" }} />
                    <Skeleton.Title style={{ width: 80, marginBottom: 12, marginTop: 12 }} />
                </div>
            </div>
        </div>
    );

    return (
        <List
            style={{ width: "100%" }}
            emptyContent={<Skeleton placeholder={placeholder} loading={true} active></Skeleton>}
            dataSource={data}
            renderItem={item => (
                <List.Item
                    style={{ width: "100%" }}
                    header={<Avatar shape="square" style={{ borderRadius: 12 }} src={item.icon}></Avatar>}
                    main={<p style={{
                        color: light ? 'black' : 'white'
                    }}>{toMinText(12, item.text)}</p>}
                    extra={
                        <Button theme='solid' size='small' type='primary' onClick={() => { window.open(item.link) }}>打开</Button>
                    }
                    align="center"
                />
            )}
        />
    )
}