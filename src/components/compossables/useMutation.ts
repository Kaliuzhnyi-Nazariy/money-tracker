import { ref } from 'vue'

type useMutationType = {
  mutationFn: () => void
  onSuccess: () => void
  onError: () => void
}

export const useMutation = ({ mutationFn, onSuccess, onError }: useMutationType) => {
  const data = ref()
  const isLoading = ref(false)
  const errorMess = ref<null | unknown>(null)

  const mutation = async (...args: any) => {
    isLoading.value = true
    try {
      errorMess.value = null
      data.value = await mutationFn(...args)
      onSuccess?.(data)
    } catch (error) {
      errorMess.value = error
      onError?.(data)
    } finally {
      isLoading.value = false
    }
  }

  return {
    data,
    isLoading,
    errorMess,
    mutation,
  }
}
