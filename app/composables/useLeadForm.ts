export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export interface LeadForm {
  name: string
  phone: string
  service: string
  comment: string
}

export function useLeadForm() {
  const form = reactive<LeadForm>({
    name: '',
    phone: '',
    service: '',
    comment: '',
  })

  const errors = reactive<Partial<LeadForm>>({})
  const status = ref<FormStatus>('idle')

  const services = [
    'Генеральная уборка',
    'Поддерживающая уборка',
    'Мытьё окон',
    'Химчистка мебели',
    'Несколько услуг',
  ]

  function validate(): boolean {
    const e: Partial<LeadForm> = {}

    if (!form.name.trim()) {
      e.name = 'Введите ваше имя'
    }

    if (!form.phone.trim()) {
      e.phone = 'Введите номер телефона'
    } else if (!/^[\d\s\+\-\(\)]{10,16}$/.test(form.phone.trim())) {
      e.phone = 'Некорректный номер'
    }

    Object.assign(errors, e)
    return Object.keys(e).length === 0
  }

  async function submit() {
    Object.keys(errors).forEach(k => delete (errors as Record<string, unknown>)[k])

    if (!validate()) return

    status.value = 'loading'

    await new Promise(r => setTimeout(r, 1200))

    /* TODO: replace with real API call
    await $fetch('/api/lead', { method: 'POST', body: form })
    */

    status.value = 'success'

    setTimeout(() => {
      status.value = 'idle'
      form.name = ''
      form.phone = ''
      form.service = ''
      form.comment = ''
    }, 4000)
  }

  return { form, errors, status, services, submit }
}
