import {postData} from '../../../utils/api';
import {
  SERVER_URL,
  CANCEL_ORDER,
  TRACK_ORDER,
  GET_STATUS,
} from '../../../utils/apiUtilities';
import {alertWithOneButton} from '../../../utils/alerts';
import i18n from '../../../locales/i18next';

/**
 * function used to request tracking details of order
 * @returns {Promise<void>}
 */
export const trackOrder = async (
  setTrackInProgress,
  setTrackMessageId,
  order,
  options,
) => {
  try {
    setTrackInProgress(true);
    const payload = [
      {
        context: {
          transaction_id: order.transactionId,
          bpp_id: order.bppId,
        },
        message: {order_id: order.id},
      },
    ];
    const {data} = await postData(
      `${SERVER_URL}${TRACK_ORDER}`,
      payload,
      options,
    );

    if (data[0].message.ack.status === 'ACK') {
      setTrackMessageId(data[0].context.message_id);
    }
  } catch (e) {
    throw e;
  }
};

/**
 * function used to request cancel order
 * @returns {Promise<void>}
 */
export const cancelOrder = async (
  setCancelInProgress,
  setCancelMessageId,
  order,
  id,
  options,
) => {
  try {
    setCancelInProgress(true);
    const payload = {
      context: {
        bpp_id: order.bppId,
        transaction_id: order.transactionId,
      },
      message: {order_id: order.id, cancellation_reason_id: id},
    };
    const {data} = await postData(
      `${SERVER_URL}${CANCEL_ORDER}`,
      payload,
      options,
    );
    setCancelMessageId(data.context.message_id);
  } catch (e) {
    throw e;
  }
};

export const getStatus = async (
  setStatusInProgress,
  setStatusMessageId,
  order,
  options,
) => {
  try {
    setStatusInProgress(true);
    const payload = [
      {
        context: {
          bpp_id: order.bppId,
          transaction_id: order.transactionId,
        },
        message: {order_id: order.id},
      },
    ];
    const {data} = await postData(
      `${SERVER_URL}${GET_STATUS}`,
      payload,
      options,
    );
    console.log(data);
    if (data[0]?.message?.ack?.status === 'ACK') {
      setStatusMessageId(data[0].context.message_id);
    } else {
      alertWithOneButton(
        i18n.t('main.order.cant_call_title'),
        i18n.t('main.order.cant_call_message'),
        i18n.t('global.ok_label'),
        () => {},
      );
    }
  } catch (e) {
    throw e;
  }
};
