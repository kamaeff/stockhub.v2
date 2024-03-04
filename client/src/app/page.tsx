import Header from '@/components/header/Header'
import Main from '@/components/main/Main'
interface SearchParamProps {
  searchParams: Record<string, string>
}
export default function Home(props: SearchParamProps) {
  return (
    <main>
      <Header searchParams={props.searchParams} />
      <Main searchParams={props.searchParams} />
    </main>
  )
}
