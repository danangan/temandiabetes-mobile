import * as ActionTypes from './constants';

export const updateDeepLink = data => ({
	type: ActionTypes.UPDATE_DEEPLINK,
	payload: data
})

export const updateDeepLinkExpire = data => ({
	type: ActionTypes.UPDATE_DEEPLINK_EXPIRED,
	payload: data
})
