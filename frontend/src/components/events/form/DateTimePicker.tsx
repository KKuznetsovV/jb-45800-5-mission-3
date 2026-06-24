import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
    value: string
    onChange: (isoString: string) => void
}

export default function DateTimePicker({ value, onChange }: Props) {
    return (
        <DatePicker
            selected={value ? new Date(value) : null}
            onChange={(date: Date | null) => onChange(date ? date.toISOString() : '')}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="MMMM d, yyyy HH:mm"
            minDate={new Date()}
            placeholderText="Select date and time"
            autoComplete="off"
        />
    )
}
