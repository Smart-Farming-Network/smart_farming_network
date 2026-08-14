import { NextResponse } from "next/server";
import { randomInt } from "crypto";

import { prisma } from "@/libs/prisma";


/*
|--------------------------------------------------------------------------
| Generate Human-Friendly Reference
|--------------------------------------------------------------------------
*/

function generateReference() {

    const date = new Date();

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    const random = randomInt(
        1000,
        10000
    );

    return `GSFN-SVC-${year}${month}${day}-${random}`;

}


/*
|--------------------------------------------------------------------------
| POST
|--------------------------------------------------------------------------
*/

export async function POST(request) {

    try {

        const body = await request.json();

        const {
            service,
            serviceSlug,
            customerName,
            customerEmail,
            customerPhone,
            amount
        } = body;


        /*
        |--------------------------------------------------------------------------
        | Validation
        |--------------------------------------------------------------------------
        */

        if (!service) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Service is required."
                },
                {
                    status: 400
                }
            );

        }

        if (!customerName) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Customer name is required."
                },
                {
                    status: 400
                }
            );

        }

        if (!customerEmail) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Customer email is required."
                },
                {
                    status: 400
                }
            );

        }

        if (!customerPhone) {

            return NextResponse.json(
                {
                    success: false,
                    message: "Customer phone number is required."
                },
                {
                    status: 400
                }
            );

        }

        if (!amount || Number(amount) <= 0) {

            return NextResponse.json(
                {
                    success: false,
                    message: "A valid payment amount is required."
                },
                {
                    status: 400
                }
            );

        }


        /*
        |--------------------------------------------------------------------------
        | Generate Reference
        |--------------------------------------------------------------------------
        */

        let reference;

        let exists = true;

        while (exists) {

            reference = generateReference();

            const existing =
                await prisma.servicePayment.findUnique({
                    where: {
                        reference
                    }
                });

            exists = Boolean(existing);

        }


        /*
        |--------------------------------------------------------------------------
        | Create Payment
        |--------------------------------------------------------------------------
        */

        const payment =
            await prisma.servicePayment.create({

                data: {

                    reference,

                    service,

                    serviceSlug:
                        serviceSlug || null,

                    customerName,

                    customerEmail:
                        customerEmail.toLowerCase().trim(),

                    customerPhone,

                    amount: Number(amount),

                    currency: "NGN",

                    status: "PENDING",

                    whatsappNumber:
                        process.env.SERVICE_PAYMENT_WHATSAPP

                }

            });


        /*
        |--------------------------------------------------------------------------
        | Payment Instructions
        |--------------------------------------------------------------------------
        */

        const whatsappMessage = encodeURIComponent(
            `Hello Goodlife Smart Farming Network,

I have made payment for a service.

Reference: ${payment.reference}
Payment UUID: ${payment.id}

Service: ${payment.service}
Amount: ₦${Number(payment.amount).toLocaleString()}

Customer Name: ${payment.customerName}
Email: ${payment.customerEmail}
Phone: ${payment.customerPhone}

I am attaching my payment receipt for verification.`
        );


        const whatsappUrl =
            `https://wa.me/${process.env.SERVICE_PAYMENT_WHATSAPP}?text=${whatsappMessage}`;


        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return NextResponse.json({

            success: true,

            message:
                "Payment registration created successfully.",

            data: {

                id: payment.id,

                reference:
                    payment.reference,

                service:
                    payment.service,

                amount:
                    Number(payment.amount),

                currency:
                    payment.currency,

                status:
                    payment.status,

                paymentDetails: {

                    bank:
                        process.env.SERVICE_PAYMENT_BANK,

                    accountName:
                        process.env.SERVICE_PAYMENT_ACCOUNT_NAME,

                    accountNumber:
                        process.env.SERVICE_PAYMENT_ACCOUNT_NUMBER

                },

                whatsappUrl

            }

        });

    } catch (error) {

        console.error(
            "SERVICE_PAYMENT_CREATE_ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Unable to create payment record."
            },
            {
                status: 500
            }
        );

    }

}