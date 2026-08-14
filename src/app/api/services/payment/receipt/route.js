import { NextResponse } from "next/server";

import { prisma } from "@/libs/prisma";


export async function PATCH(request) {

    try {

        const body =
            await request.json();

        const {
            paymentId
        } = body;


        if (!paymentId) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Payment ID is required."
                },
                {
                    status: 400
                }
            );

        }


        const payment =
            await prisma.servicePayment.findUnique({

                where: {
                    id: paymentId
                }

            });


        if (!payment) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Payment record not found."
                },
                {
                    status: 404
                }
            );

        }


        if (
            payment.status === "VERIFIED"
        ) {

            return NextResponse.json(
                {
                    success: false,
                    message:
                        "This payment has already been verified."
                },
                {
                    status: 400
                }
            );

        }


        const updatedPayment =
            await prisma.servicePayment.update({

                where: {
                    id: paymentId
                },

                data: {

                    status:
                        "RECEIPT_SUBMITTED",

                    receiptSent:
                        true,

                    receiptSentAt:
                        new Date()

                }

            });


        return NextResponse.json({

            success: true,

            message:
                "Receipt submission recorded.",

            data: {

                id:
                    updatedPayment.id,

                reference:
                    updatedPayment.reference,

                status:
                    updatedPayment.status

            }

        });

    } catch (error) {

        console.error(
            "RECEIPT_SUBMISSION_ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Unable to update payment status."
            },
            {
                status: 500
            }
        );

    }

}