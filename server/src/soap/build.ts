import {Builder} from 'xml2js'

export const jsonToXml = (operationType: string, payload) => {
    const builder = new Builder({ headless: true })

    console.log(operationType);
    console.log(payload);
    
    
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

    console.log(soapResponse);
    
    return builder.buildObject(soapResponse)
}





