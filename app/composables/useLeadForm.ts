import { reactive, ref, watch } from 'vue'

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

  const phoneSuffix = ref('')

  const preselected = useState('preselected-service', () => '')
  watch(preselected, (val) => {
    if (val) {
      form.service = val
      preselected.value = ''
    }
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

  function formatPhone(e: Event) {
    const digits = (e.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 10)
    const p1 = digits.slice(0, 3)
    const p2 = digits.slice(3, 6)
    const p3 = digits.slice(6, 8)
    const p4 = digits.slice(8, 10)
    phoneSuffix.value = [p1, p2 ? ` ${p2}` : '', p3 ? `-${p3}` : '', p4 ? `-${p4}` : ''].join('')
    form.phone = phoneSuffix.value ? `+7 ${phoneSuffix.value}` : ''
  }

  function validate(): boolean {
    const e: Partial<LeadForm> = {}
    if (!form.name.trim()) e.name = 'Введите ваше имя'
    const digits = phoneSuffix.value.replace(/\D/g, '')
    if (!digits) e.phone = 'Введите номер телефона'
    else if (digits.length < 10) e.phone = 'Номер неполный'
    if (!form.service) e.service = 'Выберите услугу'
    Object.assign(errors, e)
    return Object.keys(e).length === 0
  }

  async function submit() {
    Object.keys(errors).forEach(k => delete (errors as Record<string, unknown>)[k])
    if (!validate()) return
    status.value = 'loading'
    try {
      await $fetch('/api/contact', {
        method: 'POST',
        body: { ...form },
      })
      status.value = 'success'
      setTimeout(() => {
        status.value = 'idle'
        form.name = ''
        form.phone = ''
        form.service = ''
        form.comment = ''
        phoneSuffix.value = ''
      }, 4000)
    } catch {
      status.value = 'error'
      setTimeout(() => { status.value = 'idle' }, 3000)
    }
  }

  return { form, phoneSuffix, errors, status, services, submit, formatPhone }
}
