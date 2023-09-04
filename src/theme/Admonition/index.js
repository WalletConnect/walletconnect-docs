import React from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import Translate from '@docusaurus/Translate'
import styles from './styles.module.css'
function NoteIcon() {
  return (
    <svg viewBox="0 0 14 16">
      <path
        fillRule="evenodd"
        d="M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"
      />
    </svg>
  )
}
function TipIcon() {
  return (
    <svg viewBox="0 0 24 24">
      <path
        d="M10.940 0.699 C 9.369 0.917,7.922 1.537,6.720 2.508 C 6.327 2.826,5.593 3.585,5.311 3.967 C 4.439 5.146,3.904 6.455,3.700 7.907 C 3.623 8.455,3.623 9.506,3.700 10.094 C 3.822 11.023,4.109 11.934,4.559 12.820 C 4.861 13.414,5.052 13.710,5.461 14.220 C 6.067 14.976,6.754 15.585,7.603 16.121 C 8.186 16.489,8.520 16.811,8.703 17.180 C 8.825 17.426,8.846 17.513,8.874 17.902 C 8.911 18.421,8.997 18.619,9.245 18.758 C 9.544 18.926,10.060 18.905,10.328 18.714 C 10.605 18.517,10.701 17.996,10.584 17.324 C 10.396 16.251,9.812 15.478,8.579 14.670 C 7.576 14.012,7.037 13.497,6.493 12.673 C 5.448 11.089,5.126 9.220,5.583 7.392 C 6.068 5.454,7.313 3.928,9.133 3.040 C 9.678 2.774,10.065 2.640,10.657 2.510 C 11.009 2.434,11.180 2.422,12.000 2.422 C 12.820 2.422,12.991 2.434,13.343 2.510 C 13.935 2.640,14.322 2.774,14.864 3.039 C 16.042 3.613,17.030 4.501,17.648 5.540 C 18.517 6.999,18.818 8.691,18.495 10.300 C 18.340 11.077,17.962 11.983,17.507 12.673 C 16.963 13.497,16.424 14.012,15.421 14.670 C 14.188 15.478,13.604 16.251,13.416 17.324 C 13.300 17.993,13.395 18.517,13.669 18.712 C 13.991 18.941,14.557 18.932,14.840 18.694 C 15.037 18.528,15.091 18.380,15.126 17.904 C 15.152 17.546,15.179 17.423,15.278 17.212 C 15.446 16.853,15.797 16.502,16.314 16.176 C 18.471 14.818,19.811 12.849,20.262 10.380 C 20.365 9.817,20.386 8.518,20.302 7.933 C 20.084 6.414,19.548 5.107,18.665 3.940 C 18.361 3.537,17.673 2.826,17.280 2.509 C 16.068 1.528,14.609 0.907,13.025 0.698 C 12.500 0.629,11.445 0.629,10.940 0.699 M10.083 11.750 C 9.881 11.853,9.732 12.066,9.658 12.355 C 9.569 12.705,9.605 12.921,9.786 13.121 C 9.954 13.307,10.191 13.403,10.730 13.504 L 11.120 13.576 11.120 15.861 C 11.120 18.367,11.126 18.436,11.354 18.654 C 11.482 18.777,11.776 18.880,12.000 18.880 C 12.224 18.880,12.518 18.777,12.646 18.654 C 12.874 18.436,12.880 18.367,12.880 15.861 L 12.880 13.576 13.270 13.504 C 13.809 13.403,14.046 13.307,14.214 13.121 C 14.395 12.921,14.431 12.705,14.342 12.355 C 14.234 11.931,13.964 11.680,13.616 11.680 C 13.526 11.680,13.274 11.719,13.056 11.767 C 12.738 11.837,12.530 11.854,12.000 11.854 C 11.470 11.854,11.262 11.837,10.944 11.767 C 10.464 11.662,10.264 11.658,10.083 11.750 M9.360 19.205 C 9.089 19.313,8.915 19.616,8.888 20.029 C 8.866 20.370,8.913 20.511,9.105 20.679 C 9.274 20.827,9.503 20.893,10.240 21.007 C 10.742 21.084,10.979 21.096,12.000 21.096 C 13.021 21.096,13.258 21.084,13.760 21.007 C 14.499 20.893,14.726 20.827,14.897 20.677 C 15.076 20.520,15.135 20.334,15.111 20.004 C 15.079 19.563,14.850 19.236,14.529 19.175 C 14.436 19.157,14.140 19.181,13.745 19.238 C 12.565 19.408,11.367 19.410,10.293 19.242 C 9.716 19.152,9.512 19.144,9.360 19.205 M10.080 21.605 C 9.834 21.703,9.695 21.921,9.645 22.289 C 9.582 22.746,9.721 23.050,10.064 23.205 C 10.515 23.408,13.434 23.417,13.912 23.218 C 14.233 23.083,14.378 22.838,14.368 22.444 C 14.356 21.979,14.137 21.637,13.814 21.576 C 13.732 21.561,13.268 21.570,12.783 21.597 C 12.136 21.632,11.740 21.634,11.300 21.603 C 10.567 21.552,10.212 21.552,10.080 21.605 "
        fill-rule="evenodd"
      ></path>
    </svg>
  )
}
function DangerIcon() {
  return (
    <svg viewBox="0 0 12 16">
      <path
        fillRule="evenodd"
        d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z"
      />
    </svg>
  )
}
function InfoIcon() {
  return (
    <svg viewBox="0 0 14 16">
      <path
        fillRule="evenodd"
        d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"
      />
    </svg>
  )
}
function CautionIcon() {
  return (
    <svg viewBox="0 0 16 16">
      <path
        fillRule="evenodd"
        d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"
      />
    </svg>
  )
}
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
const AdmonitionConfigs = {
  note: {
    infimaClassName: 'secondary',
    iconComponent: NoteIcon,
    label: (
      <Translate
        id="theme.admonition.note"
        description="The default label used for the Note admonition (:::note)"
      >
        note
      </Translate>
    )
  },
  tip: {
    infimaClassName: 'success',
    iconComponent: TipIcon,
    label: (
      <Translate
        id="theme.admonition.tip"
        description="The default label used for the Tip admonition (:::tip)"
      >
        tip
      </Translate>
    )
  },
  danger: {
    infimaClassName: 'danger',
    iconComponent: DangerIcon,
    label: (
      <Translate
        id="theme.admonition.danger"
        description="The default label used for the Danger admonition (:::danger)"
      >
        danger
      </Translate>
    )
  },
  info: {
    infimaClassName: 'info',
    iconComponent: InfoIcon,
    label: (
      <Translate
        id="theme.admonition.info"
        description="The default label used for the Info admonition (:::info)"
      >
        info
      </Translate>
    )
  },
  caution: {
    infimaClassName: 'warning',
    iconComponent: CautionIcon,
    label: (
      <Translate
        id="theme.admonition.caution"
        description="The default label used for the Caution admonition (:::caution)"
      >
        caution
      </Translate>
    )
  }
}
// Legacy aliases, undocumented but kept for retro-compatibility
const aliases = {
  secondary: 'note',
  important: 'info',
  success: 'tip',
  warning: 'danger'
}
function getAdmonitionConfig(unsafeType) {
  const type = aliases[unsafeType] ?? unsafeType
  const config = AdmonitionConfigs[type]
  if (config) {
    return config
  }
  console.warn(`No admonition config found for admonition type "${type}". Using Info as fallback.`)
  return AdmonitionConfigs.info
}
// Workaround because it's difficult in MDX v1 to provide a MDX title as props
// See https://github.com/facebook/docusaurus/pull/7152#issuecomment-1145779682
function extractMDXAdmonitionTitle(children) {
  const items = React.Children.toArray(children)
  const mdxAdmonitionTitle = items.find(
    item => React.isValidElement(item) && item.props?.mdxType === 'mdxAdmonitionTitle'
  )
  const rest = <>{items.filter(item => item !== mdxAdmonitionTitle)}</>
  return {
    mdxAdmonitionTitle,
    rest
  }
}
function processAdmonitionProps(props) {
  const { mdxAdmonitionTitle, rest } = extractMDXAdmonitionTitle(props.children)
  return {
    ...props,
    title: props.title ?? mdxAdmonitionTitle,
    children: rest
  }
}
export default function Admonition(props) {
  const { children, type, title, icon: iconProp } = processAdmonitionProps(props)
  const typeConfig = getAdmonitionConfig(type)
  const titleLabel = title ?? typeConfig.label
  const { iconComponent: IconComponent } = typeConfig
  const icon = iconProp ?? <IconComponent />
  return (
    <div
      className={clsx(
        ThemeClassNames.common.admonition,
        ThemeClassNames.common.admonitionType(props.type),
        'alert',
        `alert--${typeConfig.infimaClassName}`,
        styles.admonition
      )}
    >
      <div className={styles.admonitionHeading}>
        <span className={styles.admonitionIcon}>{icon}</span>
        <span className={styles.admonitionTitle}>{titleLabel}</span>
      </div>
      <div className={styles.admonitionContent}>{children}</div>
    </div>
  )
}
