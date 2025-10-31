import './style.scss';
import React from 'react';
import { bitable as bitableSdk, bridge, dashboard as dashboardSdk, DashboardState, FieldType, IConfig, IDashboard, workspace } from "@lark-base-open/js-sdk";
import { Button } from '@douyinfe/semi-ui';
import { useState, useEffect, useRef } from 'react';
import { useConfig } from '../../hooks';
import classnames from 'classnames'
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next/typescript/t';
import { Item } from '../Item';
import { IconSelect } from '../TypeSelector';
import { TableSelector } from '../TableSelector'
import { ViewSelector } from '../ViewSelector';
import { CategorySelector } from '../CategorySelector';
import { RowViewer } from '../RowViewer';
import { GridViewer } from '../GridViewer';
import BaseSelector from '../BaseSelector';
interface IUrlGroupConfig {
  type: 'grid' | 'row',
  table: string | null,
  view: string | null,
  titleRow: string | null,
  iconRow: string | null,
  linkRow: string | null
  baseToken: string | undefined
}

interface UrlGroupProps {
  bgColor: string,
  light: boolean,
}

export default function UrlGroup(props: UrlGroupProps) {
  const { bgColor, light } = props;

  const { t, i18n } = useTranslation();

  // create时的默认配置
  const [config, setConfig] = useState<IUrlGroupConfig>({
    type: 'grid',
    table: null,
    view: null,
    titleRow: null,
    iconRow: null,
    linkRow: null,
    baseToken: undefined
  })
  const [isMultipleBase, setIsMultipleBase] = useState<boolean | undefined>(
    undefined
  );
  const [bitable, setBitable] = useState<typeof bitableSdk | null>(bitableSdk);
  const [dashboard, setDashboard] = useState<IDashboard>(dashboardSdk);

  const isCreate = dashboard.state === DashboardState.Create

   useEffect(() => {
    (async () => {
      const env = await bridge.getEnv();
      setIsMultipleBase(env.needChangeBase ?? false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!isMultipleBase) {
        return;
      }
      const workspaceBitable = await workspace.getBitable(
        config.baseToken!
      );
      const workspaceDashboard = workspaceBitable?.dashboard || dashboard;
     setDashboard(workspaceDashboard);
    })();
  }, [config.baseToken, isMultipleBase]);

  const getBaseToken = async () => {
    if (config?.baseToken) {
      return;
    }
    const baseList = await workspace.getBaseList({
      query: "",
      page: {
        cursor: "",
      },
    });
    const initialBaseToken = baseList?.base_list?.[0]?.token || "";
    setConfig({
      ...config,
      baseToken: initialBaseToken,
    });
  };

  useEffect(() => {
     (async () => {
      if (isCreate) {
      setConfig({
        type: 'grid',
        table: null,
        view: null,
        titleRow: null,
        iconRow: null,
        linkRow: null,
        baseToken: undefined
      })
      if (isMultipleBase) {
        getBaseToken();
      }
    }
    })();
  }, [i18n.language, isCreate, isMultipleBase])

  useEffect(() => {
    (async () => {
      if (isMultipleBase && !config.baseToken) {
        setBitable(null);
        return;
      }
      const realBitable = isMultipleBase
        ? await workspace.getBitable(config.baseToken!)
        : bitableSdk;
      setBitable(realBitable);
    })();
  }, [config.baseToken, isMultipleBase]);

  /** 是否配置/创建模式下 */
  const isConfig = dashboard.state === DashboardState.Config || isCreate;

  const timer = useRef<any>()

  /** 配置用户配置 */
  const updateConfig = (res: IConfig) => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    const { customConfig } = res;
    if (customConfig) {
      setConfig(customConfig as any);
      timer.current = setTimeout(() => {
        //自动化发送截图。 预留3s给浏览器进行渲染，3s后告知服务端可以进行截图了（对域名进行了拦截，此功能仅上架部署后可用）。
        dashboard.setRendered();
      }, 3000);
    }

  }

  useConfig(updateConfig)

  return (
    <main className={classnames({ 'main-config': isConfig, 'main': true,})} style={{backgroundColor: bgColor}}>
      <div className='content' style={light ? {} : {
        scrollbarColor: "#333 #222"
      }}>
        {
          config.type == "row" ?
            <RowViewer config={config} trans={t} dashboard={dashboard} bitable={bitable} />
            :
            <GridViewer config={config} trans={t} dashboard={dashboard} bitable={bitable} />
        }
      </div>
      {
        isConfig && <ConfigPanel t={t} config={config} setConfig={setConfig} dashboard={dashboard} bitable={bitable} isMultipleBase={isMultipleBase} />
      }
    </main>
  )
}



function ConfigPanel(props: {
  config: IUrlGroupConfig,
  setConfig: React.Dispatch<React.SetStateAction<IUrlGroupConfig>>,
  t: TFunction<"translation", undefined>,
  dashboard: IDashboard,
  bitable: typeof bitableSdk | null,
  isMultipleBase?: boolean,
}) {
  const { config, setConfig, t, isMultipleBase, dashboard, bitable } = props;

  /**保存配置 */
  const onSaveConfig = () => {
    dashboard.saveConfig({
      customConfig: config,
      dataConditions: [],
    } as any)
  }

  return (
    <div className='config-panel'>
      <div className='form'>

        <Item label={
          <div className='view-type'>
            {t('label.display.viewtype')}
          </div>
        }>
          <IconSelect

            onChange={(e: 'grid' | 'row') => {
              setConfig({
                ...config,
                type: e
              })
            }}
            optionList={[
              {
                label: t('label.display.viewtype.grid'),
                value: 'grid',
                icon: 'grid_inactive.svg',
                selectedIcon: 'grid_active.svg',
              },
              {
                label: t('label.display.viewtype.row'),
                value: 'row',
                icon: 'row_inactive.svg',
                selectedIcon: 'row_active.svg',
              }
            ]}
            value={config.type}
          />
        </Item>
        {isMultipleBase &&
          <Item label={
            <div className='select-table'>
              {t('label.display.select.table')}
            </div>
          }>
          <BaseSelector
              baseToken={config.baseToken!}
              onChange={(v) =>
                setConfig({
                  ...config,
                  baseToken: v,
                  table: null,
                  view: null,
                  titleRow: null,
                  iconRow: null,
                  linkRow: null,
                })
              }
            />
          </Item>
        }
        <Item label={
          <div className='select-table'>
            {t('label.display.select.table')}
          </div>
        }>
          <TableSelector
            onChange={(e) => {
              setConfig({
                ...config,
                table: e,
                view: null,
                titleRow: null,
                iconRow: null,
                linkRow: null,
              })
            }}
            defaultSection={config.table}
            bitable={bitable}
          />
        </Item>
        <Item label={
          <div className='select-view'>
            {t('label.display.select.view')}
          </div>
        }>
          <ViewSelector
            onChange={(e) => {
              setConfig({
                ...config,
                view: e,
                titleRow: null,
                iconRow: null,
                linkRow: null,
              })
            }}
            defaultSection={config.view}
            tableId={config.table}
            bitable={bitable}
          />
        </Item>
        <Item label={
          <div className='select-title'>
            {t('label.display.select.title')}
          </div>
        }>
          <CategorySelector
            onChange={(e) => {
              setConfig({
                ...config,
                titleRow: e
              })
            }}
            defaultSection={config.titleRow}
            tableId={config.table}
            viewId={config.view}
            availableFieldTypes={[FieldType.Text, FieldType.SingleSelect, FieldType.Formula]}
            bitable={bitable}
          />
        </Item >
        <Item label={
          <div className='select-icon'>
            {t('label.display.select.icon')}
          </div>
        } >
          <CategorySelector
            onChange={(e) => {
              setConfig({
                ...config,
                iconRow: e
              })
            }}
            defaultSection={config.iconRow}
            tableId={config.table}
            viewId={config.view}
            availableFieldTypes={[FieldType.Text, FieldType.Url, FieldType.Attachment, FieldType.Formula]}
            bitable={bitable}
          />
        </Item>
        <Item label={
          <div className='select-link'>
            {t('label.display.select.link')}
          </div>
        }>
          <CategorySelector
            onChange={(e) => {
              setConfig({
                ...config,
                linkRow: e
              })
            }}
            defaultSection={config.linkRow}
            tableId={config.table}
            viewId={config.view}
            availableFieldTypes={[FieldType.Text, FieldType.Url, FieldType.Attachment, FieldType.Formula]}
            bitable={bitable}
          />
        </Item>
      </div>

      <Button
        className='btn'
        theme='solid'
        onClick={onSaveConfig}
      >
        {t('confirm')}
      </Button>
    </div>
  )
}