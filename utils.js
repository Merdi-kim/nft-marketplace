import { InjectedConnector } from '@web3-react/injected-connector'

export const nftaddress = '0x47F47E6C67Fb5C270C5d392bc1078A252Cace1CA'
export const nftmarketaddress = '0x57bDF4a9950FB06E549758a14C43a2f0d6c35483'

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
})