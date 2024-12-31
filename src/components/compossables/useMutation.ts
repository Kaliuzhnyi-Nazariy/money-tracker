import { ref } from 'vue'

type useMutationType<TData, TArgs> = {
  mutationFn: (...args: TArgs[]) => Promise<TData>
  onSuccess?: (data: TData) => void
  onError?: (error: unknown | string) => void
}

export const useMutation = <TData = unknown, TArgs = unknown>({
  mutationFn,
  onSuccess,
  onError,
}: useMutationType<TData, TArgs>) => {
  const data = ref<TData | null>(null)
  const isLoading = ref(false)
  const errorMess = ref<unknown | null>(null)

  const mutation = async (...args: TArgs[]) => {
    isLoading.value = true
    try {
      errorMess.value = null
      const result = await mutationFn(...args)
      data.value = result
      onSuccess?.(result)
    } catch (error) {
      errorMess.value = error
      onError?.(error)
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
