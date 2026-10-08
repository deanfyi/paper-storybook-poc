import { Button, Card, CardBody, CardFooter, CardHeader, Page } from '@poc/ui'
import Link from 'next/link'
import { en } from '../../messages/en'

const m = en.terms

const Terms = () => (
  <Page>
    <Card>
      <CardHeader title={m.title} />
      <CardBody>{m.body}</CardBody>
      <CardFooter>
        <Button asChild variant="secondary">
          <Link href="/">{m.back}</Link>
        </Button>
      </CardFooter>
    </Card>
  </Page>
)

export default Terms
