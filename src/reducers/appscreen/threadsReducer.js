import * as ActionTypes from '../../actions/constants';

const initialState = {
	listThreads: {
		item: {
			data: [],
      recentData: [],
      page: 1,
      pages: 1,
			total: 0
		},
		threadDetails: null,
		message: '',
    status_code: 0,
    initialLoading: true
	},
	commentDetails: {
		data: null,
		message: '',
		status_code: 0
	},
	listThreadStatic: {
		item: {
      data: [],
      page: 1,
      pages: 1,
			total: 0
		},
		message: null,
    status_code: 0,
    initialLoading: true
  },
  listLatestThreads: {
		item: {
      data: [],
      page: 1,
      pages: 1,
			total: 0
		},
		message: null,
    status_code: 0,
    initialLoading: true
  },
  listBookmarkedThreads: {
		item: {
			data: [],
      page: 1,
      pages: 1,
			total: 0
		},
		message: null,
    status_code: 0,
    initialLoading: true
  },
	submitThreads: {
		message: '',
		status_code: 0
	},
	reportThread: {
		message: '',
		status_code: 0,
	},
	saveBookmark: {
		message: '',
		status_code: 0
	},
	searchResult: {
		data: [],
		message: '',
		status_code: 0
	},
	createComment: {
		status_code: 0,
		commentToReply: {
			status_code: 0
		}
	},
	followThread: {
		status_code: 0,
		message: '',
		isFetch: false,
	},
	isFetch: false
};

const getThreads = (state, payload) => {
  const { threads, status_code, message, refresh } = payload;
  const { docs } = threads;
  const threadRecent = docs.sort((a, b) => Date.parse(new Date(b.createdAt) - new Date(a.createdAt)));

  const data = refresh ? [] : state.listThreads.item.data

  return {
    ...state,
    listThreads: { ...state.listThreads,
      item: { ...state.listThreads.item,
        data: [
          ...data,
          ...threads.docs
        ],
        recentData: threadRecent,
        total: threads.total,
        page: threads.page,
        pages: threads.pages,
      },
      initialLoading: false,
      message,
      status_code
    },
  };
};

const getThreadStatic = (state, payload) => {
  const { threadStatic, message, status_code, refresh } = payload;
  const data = refresh ? [] : state.listThreadStatic.item.data
	return {
		...state,
		listThreadStatic: {
			...state.listThreadStatic,
			item: {
        ...state.listThreadStatic.item,
        data: [
          ...data,
          ...threadStatic.docs
        ],
        page: threadStatic.page,
        pages: threadStatic.pages,
        total: threadStatic.total },
      initialLoading: false,
			message,
			status_code
		}
	};
};

const getLatestThreads = (state, payload) => {
  const { threads, status_code, message, refresh } = payload;

  const data = refresh ? [] : state.listLatestThreads.item.data

  return {
    ...state,
    listLatestThreads: { ...state.listLatestThreads,
      item: { ...state.listThreads.item,
        data: [
          ...data,
          ...threads.docs
        ],
        page: threads.page,
        pages: threads.pages,
        total: threads.total
      },
      initialLoading: false,
      message,
      status_code
    },
  };
};

const getBookmarkedThreads = (state, payload) => {
  const { bookmarks, status_code, message, refresh } = payload;
  // map bookmark into thread list
  const threads = bookmarks.docs.map(item => {
    const thread = item.thread
    thread.isBookmarked = true
    return thread
  })

  const data = refresh ? [] : state.listBookmarkedThreads.item.data

  return {
    ...state,
    listBookmarkedThreads: { ...state.listBookmarkedThreads,
      item: {
        ...state.listBookmarkedThreads.item,
        data: [
          ...data,
          ...threads,
        ],
        page: bookmarks.page,
        pages: bookmarks.pages,
        total: bookmarks.total,
      },
      initialLoading: false,
      message,
      status_code
    },
  };
};

const postThreads = (state, payload) => {
	const { message, status_code } = payload;
	return {
		...state,
		submitThreads: { ...state.submitThreads, message, status_code }
	};
};

const handleSearch = (state, payload) => {
	const { threads, status_code, message } = payload;
	return {
		...state,
		searchResult: { ...state.searchResult, data: threads.docs, status_code, message }
	};
};

const handleReport = (state, payload) => {
  const { status_code, message } = payload;
  return {
    ...state, reportThread: { ...state.reportThread, message, status_code }
  };
};

const postBookmark = (state, payload) => {
  const { status_code, message, threadIndex } = payload;
  const mutatedThread = state.listThreads.item.data[threadIndex]
  mutatedThread.isBookmarked = !mutatedThread.isBookmarked
  return {
    ...state,
    listThreads: {
      ...state.listThreads,
      item: {
        ...state.listThreads.item,
        data: [
          ...state.listThreads.item.data.slice(0, threadIndex),
          mutatedThread,
          ...state.listThreads.item.data.slice(threadIndex+1),
        ]
      }
    },
    saveBookmark: { ...state.saveBookmark, message, status_code }
  };
};

const postBookmarkLatestThreads = (state, payload) => {
  const { status_code, message, threadIndex } = payload;
  const mutatedThread = state.listLatestThreads.item.data[threadIndex]
  mutatedThread.isBookmarked = !mutatedThread.isBookmarked
  return {
    ...state,
    listLatestThreads: {
      ...state.listLatestThreads,
      item: {
        ...state.listLatestThreads.item,
        data: [
          ...state.listLatestThreads.item.data.slice(0, threadIndex),
          mutatedThread,
          ...state.listLatestThreads.item.data.slice(threadIndex+1),
        ]
      }
    },
    saveBookmark: { ...state.saveBookmark, message, status_code }
  };
};

const postBookmarkFeaturedThreads = (state, payload) => {
  const { status_code, message, threadIndex } = payload;
  const mutatedThread = state.listThreadStatic.item.data[threadIndex]
  mutatedThread.isBookmarked = !mutatedThread.isBookmarked
  return {
    ...state,
    listThreadStatic: {
      ...state.listThreadStatic,
      item: {
        ...state.listThreadStatic.item,
        data: [
          ...state.listThreadStatic.item.data.slice(0, threadIndex),
          mutatedThread,
          ...state.listThreadStatic.item.data.slice(threadIndex+1),
        ]
      }
    },
    saveBookmark: { ...state.saveBookmark, message, status_code }
  };
};

const postBookmarkSearchThreads = (state, payload) => {
  const { status_code, message, threadIndex } = payload;
  const mutatedThread = state.searchResult.data[threadIndex]
  mutatedThread.isBookmarked = !mutatedThread.isBookmarked
  return {
    ...state,
    searchResult: {
      ...state.searchResult,
      data: [
        ...state.searchResult.data.slice(0, threadIndex),
        mutatedThread,
        ...state.searchResult.data.slice(threadIndex+1),
      ]
    },
    saveBookmark: { ...state.saveBookmark, message, status_code }
  };
};

const deleteBookmarkedThread = (state, payload) => {
  const { status_code, message, threadIndex } = payload;
  return {
    ...state,
    listBookmarkedThreads: {
      ...state.listBookmarkedThreads,
      item: {
        ...state.listBookmarkedThreads.item,
        data: [
          ...state.listBookmarkedThreads.item.data.slice(0, threadIndex),
          ...state.listBookmarkedThreads.item.data.slice(threadIndex+1),
        ]
      }
    },
    saveBookmark: { ...state.saveBookmark, message, status_code }
  };
};

const updateBookmarkThreadsByThreadId = (state, { threadId }) => {
  // get thread index by id
  const { data } = state.listThreads.item

  let found = false
  let threadIndex = 0
  for (let idx = 0; idx < data.length && !found; idx++) {
    if (data[idx]._id === threadId) {
      found = true
      threadIndex = idx
    }
  }
  console.log(threadIndex, found)

  if (found) {
    const mutatedThread = state.listThreads.item.data[threadIndex]
    mutatedThread.isBookmarked = !mutatedThread.isBookmarked
    return {
      ...state,
      listThreads: {
        ...state.listThreads,
        data: [
          ...state.listThreads.item.data.slice(0, threadIndex),
          mutatedThread,
          ...state.listThreads.item.data.slice(threadIndex+1),
        ]
      },
    };
  } else {
    return state
  }
}

const updateBookmarkLatestThreadsByThreadId = (state, { threadId }) => {
  // get thread index by id
  const { data } = state.listLatestThreads.item

  let found = false
  let threadIndex
  for (let idx = 0; idx < data.length && !found; idx++) {
    if (data[idx]._id === threadId) {
      found = true
      threadIndex = idx
    }
  }

  if (found) {
    const mutatedThread = state.listLatestThreads.item.data[threadIndex]
    mutatedThread.isBookmarked = !mutatedThread.isBookmarked
    return {
      ...state,
      listLatestThreads: {
        ...state.listLatestThreads,
        data: [
          ...state.listLatestThreads.item.data.slice(0, threadIndex),
          mutatedThread,
          ...state.listLatestThreads.item.data.slice(threadIndex+1),
        ]
      },
    };
  } else {
    return state
  }
}

const updateBookmarkFeaturedThreadsByThreadId = (state, { threadId }) => {
  // get thread index by id
  const { data } = state.listThreadStatic.item

  let found = false
  let threadIndex
  for (let idx = 0; idx < data.length && !found; idx++) {
    if (data[idx]._id === threadId) {
      found = true
      threadIndex = idx
    }
  }

  if (found) {
    const mutatedThread = state.listThreadStatic.item.data[threadIndex]
    mutatedThread.isBookmarked = !mutatedThread.isBookmarked
    return {
      ...state,
      listThreadStatic: {
        ...state.listThreadStatic,
        data: [
          ...state.listThreadStatic.item.data.slice(0, threadIndex),
          mutatedThread,
          ...state.listThreadStatic.item.data.slice(threadIndex+1),
        ]
      },
    };
  } else {
    return state
  }
}

/**
 *
 * @param {*} state object
 * @param {*} payload object
 * Setelah post comment dan comment to reply
 * set default create comment to initialState
 */
const getThreadsDetails = (state, payload) => {
	// const thread = {
	// 	...payload.thread,
	// 	isSubscriber: payload.isSubscriber
	// };
	// console.log('INI THREDE ', thread);
	return {
		...state,
		listThreads: {
			...state.listThreads,
			threadDetails: payload.thread,
			status_code: 200
		},
		createComment: {
			...state.createComment,
			status_code: 0,
			commentToReply: {
				...state.createComment.commentToReply,
				status_code: 0
			}
		},
		isFetch: false
	};
};

const createComment = (state, payload) => {
	return {
		...state,
		createComment: { ...state.createComment, status_code: payload.status },
		isFetch: false
	};
};

const commentToReply = (state, payload) => {
	return {
		...state,
		createComment: {
			...state.createComment,
			commentToReply: {
				...state.createComment.commentToReply, status_code: payload.status
			}
		}
	};
};

const threadsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ActionTypes.GET_THREADS:
			return getThreads(state, action.payload);
		case ActionTypes.POST_THREDS:
			return postThreads(state, action.payload);
		case ActionTypes.SEARCH_THREADS:
			return handleSearch(state, action.payload);
		case ActionTypes.REPORT_THREAD:
			return handleReport(state, action.payload);
		case ActionTypes.GET_THREADS_STATIC:
      return getThreadStatic(state, action.payload);
    case ActionTypes.GET_LATEST_THREADS:
			return getLatestThreads(state, action.payload);
		case ActionTypes.BOOKMARK_THREAD:
      return postBookmark(state, action.payload);
    case ActionTypes.UPDATE_BOOKMARK_THREADS_BY_ID:
      return updateBookmarkThreadsByThreadId(state, action.payload)
    case ActionTypes.UPDATE_BOOKMARK_LATEST_THREADS_BY_ID:
      return updateBookmarkLatestThreadsByThreadId(state, action.payload)
    case ActionTypes.UPDATE_BOOKMARK_FEATURED_THREADS_BY_ID:
      return updateBookmarkFeaturedThreadsByThreadId(state, action.payload)
    case ActionTypes.RESET_SAVE_BOOKMARK:
      return {
        ...state,
        saveBookmark: {
          message: '',
          status_code: 0
        }
      };
    case ActionTypes.BOOKMARK_LATEST_THREAD:
      return postBookmarkLatestThreads(state, action.payload);
    case ActionTypes.BOOKMARK_FEATURED_THREAD:
      return postBookmarkFeaturedThreads(state, action.payload);
    case ActionTypes.BOOKMARK_SEARCH_THREAD:
      return postBookmarkSearchThreads(state, action.payload);
    case ActionTypes.DELETE_BOOKMARKED_THREAD:
      return deleteBookmarkedThread(state, action.payload);
    case ActionTypes.GET_BOOKMARKED_THREADS:
			return getBookmarkedThreads(state, action.payload);
		case 'PENDING_THREAD_DETAILS':
			return {
				...state,
				listThreads: {
					...state.listThreads,
					threadDetails: null,
					status_code: 0
				},
			};
		case `${ActionTypes.GET_THREAD_DETAILS}`:
			return getThreadsDetails(state, action.payload);
		case 'PENDING_CREATE_COMMENT':
			return {
				...state,
				listThreads: {
					...state.listThreads,
					threadDetails: null,
					status_code: 0
				},
				createComment: {
					...state.createComment,
					status_code: 0
				}
			};
		case ActionTypes.CREATE_COMMENT:
			return createComment(state, action.payload);
		case 'PENDING_COMMENT_TO_REPLY':
			return {
				...state,
				listThreads: {
					...state.listThreads,
					threadDetails: null,
					status_code: 0
				},
				createComment: {
					...state.createComment,
					commentToReply: {
						...state.createComment.commentToReply,
						status_code: 0
					}
				}
			};
		case ActionTypes.COMMENT_TO_REPLY:
			return commentToReply(state, action.payload);
		case 'PENDING_FOLLOW_THREADS':
			return {
				...state,
				followThread: {
					...state.followThread, status_code: 0, message: '', isFetch: true
				}
			};
		case ActionTypes.FOLLOW_THREADS:
			return {
				...state,
				followThread: {
					...state.followThread, status_code: 200, message: 'Success follow thread', isFetch: false
				},
				listThreads: {
					...state.listThreads,
					threadDetails: {
						...state.listThreads.threadDetails, isSubscriber: true
					}
				}
			};
		case 'PENDING_UNFOLLOW_THREADS':
			return {
				...state,
				followThread: {
					...state.followThread, status_code: 0, message: '', isFetch: true
				}
			};
		case ActionTypes.UNFOLLOW_THREADS:
			return {
				...state,
				followThread: {
					...state.followThread,
					status_code: 200,
					message: 'Success un-follow thread',
					isFetch: false
				},
				listThreads: {
					...state.listThreads,
					threadDetails: {
						...state.listThreads.threadDetails, isSubscriber: false
					}
				}
			};
		case 'PENDING_GET_COMMENT_DETAILS':
			return {
				...state,
				commentDetails: {
					...state.commentDetails,
					data: null,
					message: '',
					status_code: 0
				}
			};
		case ActionTypes.GET_COMMENT_DETAILS:
			const { data, status } = action.payload;
			return {
				...state,
				commentDetails: {
					...state.commentDetails,
					data: data.data[0],
					message: 'Success get comment details',
					status_code: status
				}
			};
		default:
			return state;
	}
};

export { threadsReducer };
