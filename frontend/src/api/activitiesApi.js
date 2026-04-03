import apiClient from './apiClient'

/**
 * Fetch paginated activities from backend for a specific user.
 */
export const fetchActivities = async (uzyId, page = 1, pageSize = 10) => {
  try {
    console.log(
      `[API] Fetching activities for uzyId=${uzyId}, page=${page}, pageSize=${pageSize}...`,
    )
    const response = await apiClient.get('/activities', {
      params: { uzyId, page, pageSize },
    })
    console.log(
      `[API] ✅ Successfully fetched ${response.data.data.length} activities (total=${response.data.total})`,
    )
    return response.data
  } catch (error) {
    console.error(`[API] ❌ Error fetching activities:`, error.message)
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Failed to fetch activities from server',
    )
  }
}
