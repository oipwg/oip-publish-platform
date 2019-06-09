import config from '../../../config'
import { setFloExchangeRate, txError, txPending, txSuccess } from './creators'

export const sendTx = ({ address, value }) => async (dispatch, getState) => {
  const { Wallet } = getState()
  if (config.privatekey === '' || !config.privatekey) {
    console.error('failed to send tx. private key not set')
    return
  }
  let xWallet = Wallet.xWallet

  let output = { address, value }

  dispatch(txPending())
  let txid
  try {
    txid = await xWallet.sendTx(output)
  } catch (err) {
    console.error(`failed to send tx. \n ${err}`)
    dispatch(txError(err))
  }
  dispatch(txSuccess())
  console.log('tx sent: ', txid)
  return txid
}

export const getBalance = (addr) => async (dispatch, getState) => {
  const { Wallet } = getState()
  if (config.privatekey === '' || !config.privatekey) {
    console.error('failed to get address from explorer. private key not set')
    return
  }
  let explorer = Wallet.xWallet.explorer
  let res
  try {
    res = await explorer.getAddress('oRpmeYvjgfhkSpPWGL8eP5ePupyop3hz9j')
  } catch (err) {
    console.error(`failed to get address from explorer: \n ${err}`)
    return
  }

  console.log('res xplr address ', res)
}

export const getExchangeRate = () => async (dispatch, getState) => {
  const { _exchange } = getState().Wallet

  let xr
  try {
    xr = await _exchange.getExchangeRate('flo', 'usd')
  } catch (err) {
    console.log(`Failed to get exchange rate: \n ${err}`)
    return
  }
  dispatch(setFloExchangeRate(xr))
  return xr
}
