import React from 'react';
import Head from '@docusaurus/Head';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './vcc-embed.module.css';

export const digholeit = {
  name: 'DigHoleIt',
  image: '/img/digholeit/hero.jpg',
  guide: '/unity-vrc/digholeit/getting-started',
};

export default function VccEmbed({product}) {
  const profileUrl = useBaseUrl('/img/icon.png');
  const imageUrl = useBaseUrl(product?.image || '/img/icon.png');
  const guideUrl = useBaseUrl(product?.guide || '/unity-vrc/packages');
  const title = translate({id: 'vccEmbed.title', message: 'Add LogicCuteGuy to VCC'});
  return (
    <>
      <Head>
        <title>{product ? `${product.name} | ${title}` : title}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={`${styles.widget} ${product ? styles.product : ''}`}>
        <img className={product ? styles.background : styles.avatar} src={imageUrl} alt={product ? '' : 'LogicCuteGuy'} />
        <div className={product ? styles.productContent : styles.content}>
        {product && <img className={styles.avatar} src={profileUrl} alt="LogicCuteGuy profile" />}
        {product && <p className={styles.creator}>LogicCuteGuy</p>}
        <h1>{product?.name || 'LogicCuteGuy'}</h1>
        {!product && <p className={styles.packages}>Help Tools · LCGUdonSharp · DigHoleIt</p>}
        <a className={styles.install} href="vcc://vpm/addRepo?url=https://vpm.logiccuteguy.com/index.json" target="_blank" rel="noopener noreferrer">
          <Translate id="vccEmbed.add">Add to VCC</Translate>
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
        <p className={styles.hint}>{product ? <Translate id="vccEmbed.productNext" values={{name: product.name}}>{'Add the repository, then install {name} in VCC → Manage Packages.'}</Translate> : <Translate id="vccEmbed.next">Confirm the repository in VCC, then add the package to your project.</Translate>}</p>
        <a href={guideUrl} target="_blank" rel="noopener noreferrer"><Translate id="vccEmbed.help">Installation guide / VCC not opening?</Translate></a>
        {!product && <label className={styles.manual}>
          <span><Translate id="vccEmbed.manual">Manual repository URL</Translate></span>
          <input readOnly value="https://vpm.logiccuteguy.com/index.json" onFocus={(event) => event.target.select()} />
        </label>}
        </div>
      </main>
    </>
  );
}
