import React, {useState} from 'react';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {digholeit} from './vcc-embed';

export default function BoothEmbed() {
  const [asset, setAsset] = useState('digholeit');
  const product = asset === 'digholeit' ? digholeit : null;
  const route = product ? '/vcc-embed/digholeit' : '/vcc-embed';
  const embedPath = useBaseUrl(route);
  const embedUrl = useBaseUrl(route, {absolute: true});
  const title = translate({id: 'boothEmbed.title', message: 'BOOTH: square VCC embed'});
  const widgetTitle = translate({id: 'vccEmbed.title', message: 'Add LogicCuteGuy to VCC'});
  const iframeTitle = product ? `${product.name} | ${widgetTitle}` : widgetTitle;
  const embedCode = `<iframe src="${embedUrl}" width="1000" height="1000" style="width:100%;height:auto;aspect-ratio:1/1;border:0;" title="${iframeTitle}" loading="lazy"></iframe>`;

  return (
    <Layout title={title}>
      <main className="container margin-vert--lg" style={{maxWidth: 800}}>
        <h1>{title}</h1>
        <label htmlFor="embed-asset"><Translate id="boothEmbed.asset">Asset</Translate></label>{' '}
        <select id="embed-asset" value={asset} onChange={(event) => setAsset(event.target.value)} className="margin-bottom--md" style={{padding: '8px 12px', font: 'inherit'}}>
          <option value="digholeit">DigHoleIt</option>
          <option value="all"><Translate id="boothEmbed.all">All LogicCuteGuy tools</Translate></option>
        </select>
        <p><Translate id="boothEmbed.instructions">Copy this code into the embed-code field on your BOOTH product page. The widget uses a square (1:1) layout.</Translate></p>
        <CodeBlock language="html">{embedCode}</CodeBlock>
        <iframe src={embedPath} title={iframeTitle} width="480" height="480" style={{width: '100%', maxWidth: 480, height: 'auto', aspectRatio: '1 / 1', border: '1px solid var(--ifm-color-emphasis-300)'}} />
        <p><a href={embedPath} target="_blank" rel="noopener noreferrer"><Translate id="boothEmbed.open">Open the widget in a new tab</Translate></a></p>
        <p><Translate id="boothEmbed.fallback">If BOOTH rejects the iframe or blocks opening VCC, paste this link into your product description instead:</Translate></p>
        <CodeBlock language="text">{embedUrl}</CodeBlock>
      </main>
    </Layout>
  );
}
