import {Builder} from 'xml2js'

export const jsonToXml = (operationType: string, payload) => {
    const builder = new Builder({ headless: true })

   
    
    
    let soapResponse = {
        "soap:Envelope": {
            $: {"xmlns:soap": "https://schemas.xmlsoap.org/soap/envelope/"},
            "soap:Body": {
                [operationType]: {
                    user : payload.map(u => ({
                        name: u.name,
                        age: u.age,
                        email: u.email,
                        id: u.id
                    }))
                }
            }
        }
    }


    
    return builder.buildObject(soapResponse)
}





