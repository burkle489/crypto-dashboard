import { useEffect, useState } from 'react'
import { ChangeMe } from '../components/CoinbaseTracker/models'

export const useFetch = <T>(url: string, options?: object) => {
    const [response, setResponse] = useState<T | null>(null)
    const [error, setError] = useState<ChangeMe>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, options)
                const json = await res.json()
                setResponse(json)
            } catch (err) {
                setError(err)
            }
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { response, error }
}
