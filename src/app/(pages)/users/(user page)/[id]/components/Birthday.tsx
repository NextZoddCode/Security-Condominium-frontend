// Imports

export default function Birthday({ date }: { date: string }) {

    const birthday = date.split('')

    const first = birthday.slice(8).join('')

    const second = birthday.slice(4, 8).join('')

    const third = birthday.slice(0, 4).join('')

    const result = first + second + third

    const newDate = result.replaceAll('-', '/')

    return (
        <p className="text-xl font-medium">Nascimento: {newDate}</p>
    )
}