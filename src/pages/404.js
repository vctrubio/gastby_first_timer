import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import { LogoBar } from "./index"

const NotFoundPage = () => (
  <div>
    <LogoBar />
    <div className="text-center container mt-5">
      <h1>
        No podemos encontrar lo que buscas
      </h1>
      <h2>Contact FORM</h2>
      <p>gmail</p>
      <p>phone</p>
      <p>instagram</p>
    </div>
  </div>
)

export const Head = () => <Seo title="404" />

export default NotFoundPage
