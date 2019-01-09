import { API_CALL } from '../utils/ajaxRequestHelper';

export const sendActivity = async (action, contentId, contentDesc ) => {
  try {
    const option = {
      method: 'POST',
      url: 'api/user-activity',
      data: {
        content_id: contentId,
        content: contentDesc,
        act : action
      }
    };

    const { data } = await API_CALL(option);

  } catch (error) {
    console.log(error)
  }
};

