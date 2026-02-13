export interface SupportArticle {
    id: string;
    title: string;
    content: string;
    updatedAt?: string;
}

export interface SupportCategory {
    id: string;
    title: string;
    articles: SupportArticle[];
}

export const SUPPORT_DATA: SupportCategory[] = [
    {
        id: 'orders',
        title: 'Orders & Delivery',
        articles: [
            {
                id: 'delivery-information',
                title: 'Delivery Information',
                content: `
                    <h3>Order Processing and Shipping</h3>
                    <p>At Mozzify, we are committed to ensuring a seamless and efficient shopping experience for every customer.</p>
                    <p>All orders are processed within 1 to 4 business days. Once your order has been processed, it will be dispatched for shipment.</p>
                    <p>Estimated delivery times range between 4 to 15 days, depending on the destination and shipping conditions.</p>
                    <p><strong>Please note:</strong> During special seasonal periods or high-volume dates (such as sales, holidays, or promotional events), order processing and delivery times may experience slight delays. This is completely normal due to increased demand. Rest assured — your order is on the way and will be delivered.</p>

                    <h3>Order Tracking</h3>
                    <p>Once your order has been processed and shipped, you will receive a confirmation email containing your tracking number.</p>
                    <p>This number will allow you to track your package and monitor its status at any time. You can also track your order directly from our website by visiting the main menu and selecting “Track My Order.”</p>

                    <h3>Missed Delivery or Incorrect Address</h3>
                    <p>If the recipient is unavailable at the time of delivery, or if the provided address is incorrect or incomplete, the order will be held at the nearest local post office.</p>
                    <p><strong>Notification:</strong> You will receive an email with detailed information about where and how to collect your order, including the post office address and a 15-business-day window to pick up your package.</p>
                    <p><strong>Pickup Period:</strong> Customers have 15 business days from the notification date to collect their package. After this period, the order will be considered unclaimed and returned to the sender.</p>
                    <p><strong>Return to Sender:</strong> If the order is returned due to non-collection within the allotted time, the customer will be responsible for covering the reshipping costs should they wish to have it resent.</p>

                    <h3>Accuracy of Shipping Information</h3>
                    <p>Customers are responsible for providing complete and accurate shipping details at checkout. Please verify your information carefully before confirming your order to avoid delivery delays or issues.</p>

                    <h3>Customer Support</h3>
                    <p>For any questions or issues regarding your order, please contact our customer care team:</p>
                    <p>📧 support@mozzify.com<br/>📱 Instagram: @mozzify.official</p>

                    <h3>Acceptance and Policy Updates</h3>
                    <p>By placing an order on our website, you acknowledge and agree to the terms outlined in this Shipping Policy. This policy is subject to periodic updates and revisions. We recommend checking this page regularly to stay informed of any changes.</p>
                `
            },
            {
                id: 'track-my-order',
                title: 'How do I track my order?',
                content: `
                    <p>Don't worry if you've not received your tracking link yet - we're working on it! You'll soon receive an email titled "Your Mozzify order's on the way". Make sure to check your junk folder - sometimes our emails sneak in there.</p>
                    <p>Please allow up to 72 hours for your first tracking update to appear.</p>
                    
                    <h3>TRACK YOUR ORDER</h3>
                    <p><strong>Already have a Mozzify account?</strong> Tracking your orders is made easy through your account section, simply;</p>
                    <ul>
                        <li>Log into your Account</li>
                        <li>Head to Account > My Orders</li>
                        <li>Check the fulfilment status of your order. If it's fulfilled, select the order. (If status is not yet fulfilled, don't worry - we're working on it).</li>
                        <li>Click "Track Your Order" to be directed to your specific courier tracking. Alternatively, you can use the link provided in your shipping confirmation email.</li>
                    </ul>

                    <h3>What if my tracking hasn't updated?</h3>
                    <p>No stress! Tracking numbers typically update with couriers every 24-48 hours, however, additional delays may occur while your order is in transit.</p>
                    <p>In the first instance, check your tracking to understand if your order has been held up by the courier due to issues such as an incorrect address or Customs Fees.</p>
                    <p>If you've realised that you've entered an incorrect or incomplete address, head to our "I want to change my order/address" article.</p>
                    <p>If your tracking hasn't updated in a few days, don't panic, your order should still be on the way to you. However, if your tracking hasn't updated in 10+ working days please get in touch with our Customer Support team who will be able to assist you.</p>
                    <p>For international orders, please allow 14+ days for your tracking to update before contacting our team to investigate your order.</p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            },
            {
                id: 'problem-with-order',
                title: 'I HAVE A PROBLEM WITH MY ORDER',
                content: `
                    <p>We’re really sorry to hear there’s an issue with your order. Our team works hard to get everything right, but sometimes mistakes can happen. Don’t worry - we’ll help get this sorted.</p>

                    <h3>MISSING AN ITEM FROM YOUR ORDER?</h3>
                    <p>We know how exciting it is waiting for your Mozzify gear to arrive, so if something seems to be missing, we’re here to help you figure it out quickly.</p>
                    <p>Before anything else, double-check your shipping confirmation email. If the item is listed there, it should be in the package you’ve received.</p>

                    <h3>THE ITEM SHOWS ON MY SHIPPING CONFIRMATION EMAIL, BUT IT'S NOT IN MY PARCEL?</h3>
                    <p>If the item(s) appear on your shipping confirmation but aren’t in your parcel, please reach out to our Customer Support team within 7 days of delivery so we can look into it for you.</p>

                    <h3>THE ITEM ISN'T ON MY SHIPPING CONFIRMATION EMAIL - WHAT NOW?</h3>
                    <p>Don’t worry! There are a couple of reasons this might happen:</p>
                    <ul>
                        <li><strong>IT MAY BE ARRIVING IN A SEPARATE PACKAGE:</strong> You can check if your order will arrive in separate packages via your shipping confirmation email titled "Your order is on the way". Sometimes, due to stock availability, we ship items from different warehouses.</li>
                        <li><strong>YOUR ITEM MAY HAVE BEEN REFUNDED:</strong> The item(s) missing may have been out of stock. If we’re unable to send the item(s), you may receive an email titled “An update on your order”, letting you know. In these cases, you’ll be refunded for the value of the missing item(s).</li>
                    </ul>

                    <h3>RECEIVED THE WRONG ITEM?</h3>
                    <p>If you’ve received an incorrect item, please reach out to our Customer Support team as soon as possible so we can help. Include your order number, a clear photo of the item(s) you received, and a photo of the packaging.</p>

                    <h3>RECEIVED A DAMAGED ITEM?</h3>
                    <p>If something in your order has arrived damaged, please get in touch with our Customer Support team as soon as you can. Include full-length photos of the damaged item(s), a close-up photo of the damage, and photos of all labels.</p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            },
            {
                id: 'change-order-address',
                title: 'I WANT TO CHANGE MY ORDER/ADDRESS',
                content: `
                    <h3>Can I cancel my order?</h3>
                    <p>You've got a 15 minute window to cancel after placing your order. You can do this by hitting the 'Cancel Order' button in your Mozzify account or email confirmation. Once the order has been cancelled successfully, you'll receive an email to confirm the cancellation.</p>
                    <p>Unfortunately, our Customer Support team can’t cancel orders once they’ve been placed. Once 15 minutes has passed, it can't be cancelled as it will be getting picked and packed in our warehouse.</p>

                    <h3>Can I make a change to my order?</h3>
                    <p>Due to how quickly orders are passed to our warehouse to be shipped, we’re unable to edit orders once placed. This includes: adding or removing items, changing an item size or colour, amending delivery address, or changing the shipping method.</p>

                    <h3>Can I change my delivery address?</h3>
                    <p>Sadly we cannot change an address with the courier once the order is placed, however it is possible you may be able to get this updated with the courier by contacting them directly once your order has been dispatched.</p>
                    <p><em>*If you input the incorrect address at checkout, we cannot be held accountable if the order goes missing and are therefore not liable to refund/replace the order.</em></p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            },
            {
                id: 'customs-imports-fees',
                title: 'Customs & Imports Fees',
                content: `
                    <h3>What is Customs Duty?</h3>
                    <p>When goods are imported into a different country or customs territory, there can be a charge applied called 'Customs Duty' that is charged by the local customs authority. If Customs Duty is required by your territory, you'll be responsible for paying it to the authorities.</p>

                    <h3>Do I need to pay Customs Duty fees at Mozzify?</h3>
                    <p>You don't need to pay customs fees when shopping on our primary stores. For other territories, you may face customs charges issued by your local customs authority.</p>

                    <h3>What if I don't pay the Customs Duty?</h3>
                    <p>If you decide to refuse the customs fee, we must confirm with the courier that your parcel will be returned back to Mozzify before processing a refund. In some instances, a shipping and handling fee may be deducted.</p>

                    <h3>What is Sales Tax?</h3>
                    <p>Sales Tax (VAT or GST) is a tax charged on the supply of goods. Mozzify is generally registered for Sales Tax in the countries it ships to, and we'll charge you the Sales Tax as part of the checkout process.</p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            }
        ]
    },
    {
        id: 'returns',
        title: 'Returns & Refunds',
        articles: [
            {
                id: 'how-to-return',
                title: 'How do I return my items?',
                updatedAt: '16 days ago',
                content: `
                    <p>We offer free returns to the following countries: United Kingdom (mainland), United States, Canada, Germany, Austria, Switzerland, France, Belgium, Greece, Netherlands, Sweden, Denmark, Finland, Norway, Poland, Australia, New Zealand and Ireland.</p>
                    <p>If your country is not listed here you may be responsible for the cost of your return.</p>
                    
                    <h3>To start your return, choose your location below:</h3>
                    <p><a href="/returns/new">Start A Return</a></p>

                    <p>In the unlikely event you've received a faulty item, check out our 'Received a faulty item?' page. Please don't return any damaged or incorrectly delivered goods unless you're told to by a member of our support team. If you do this, it will delay us resolving your issue.</p>

                    <h3>RETURNING RETAIL ORDERS BY POST</h3>
                    <p>If you would like to return your retail order online, please reach out to the Customer Support team with the following info:</p>
                    <ul>
                        <li>Order / Receipt Number</li>
                        <li>Your Full Shipping Address (including postcode)</li>
                        <li>Phone Number</li>
                        <li>Items Returning</li>
                        <li>Preferred Courier & whether you'd prefer a printed label or QR code</li>
                    </ul>
                    <p>Be sure to keep your proof of postage, as it may be needed to process your return. Retail returns must be sent from the country you bought them in.</p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            },
            {
                id: 'returns-policy',
                title: 'Returns Policy',
                updatedAt: '14 days ago',
                content: `
                    <p>We get it - sometimes something just doesn't work for you. As long as your item(s) were purchased from mozzify.com or our Mozzify App, and are still in their original condition, you have up to 30 days to return your item back to us!</p>

                    <h3>What items can I return?</h3>
                    <p>Any unwanted product must be returned within 30 days from when your Mozzify order was delivered or purchased in-store. Exceptions:</p>
                    <ul>
                        <li>Underwear & Swimwear can't be returned for hygiene reasons.</li>
                        <li>Socks can be returned if they are sealed in their original packaging.</li>
                        <li>All bottles are non-returnable due to hygiene reasons.</li>
                        <li>Personalised items can't be returned.</li>
                        <li>In some regions, items marked 'Final Sale' are not eligible for returns.</li>
                    </ul>

                    <h3>Status of items</h3>
                    <p>To receive a full refund, all items must be returned to us unworn, unused, unwashed and in the same condition you received them. All items are inspected on return.</p>

                    <h3>When will I get my refund?</h3>
                    <p>Refunds can take up to 7 days to be processed from the date we receive your order back to our warehouse. Please note it can take up to an additional 5 days for your refund to appear in your account once processed.</p>

                    <h3>Do you offer exchanges?</h3>
                    <p>Exchanges are currently available in major regions including US, UK, Canada, and Europe. If you opt for an exchange, we ship out your chosen item once the returning item is scanned in at our warehouse.</p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            },
            {
                id: 'waiting-on-refund',
                title: 'Still Waiting on Your Refund or Exchange?',
                updatedAt: '2 months ago',
                content: `
                    <h3>WHY HAVE I NOT RECEIVED MY REFUND OR EXCHANGE?</h3>
                    <p>Delivery times to our warehouse can vary depending on your country and the courier you use. Once your return has arrived, it can take up to 7 days for our team to scan and process it.</p>

                    <h3>HOW CAN I CHECK THE STATUS OF MY RETURN?</h3>
                    <p>If your courier provided a tracking number, check for updates such as "Delivered" or "Returned to warehouse". We’ll notify you by email as soon as your refund or exchange has been processed.</p>

                    <h3>HOW LONG DOES IT TAKE TO RECEIVE MY REFUND ONCE PROCESSED?</h3>
                    <p>After your refund has been processed, it may take up to 7 working days for the funds to appear in your account, depending on your bank.</p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            },
            {
                id: 'non-mozzify-item',
                title: "I've returned a non-mozzify item by mistake",
                updatedAt: '3 years ago',
                content: `
                    <p>Accidentally sent back the wrong item? Contact us with the following information:</p>
                    <ul>
                        <li>Your full name and email address</li>
                        <li>The order number associated with your return</li>
                        <li>The date you returned the item</li>
                        <li>A description and photos of the item</li>
                    </ul>
                    <p>We’ll do our absolute best to help you retrieve it, but we can’t make any promises! Anything accidentally returned that is not a Mozzify item is the responsibility of the sender.</p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            },
            {
                id: 'faulty-item',
                title: 'Received a faulty item?',
                updatedAt: '3 years ago',
                content: `
                    <p>We're sorry if you've received a faulty item! There's no need to return it at this stage. Please send our Customer Support Team:</p>
                    <ul>
                        <li>Your name and email address</li>
                        <li>Order number</li>
                        <li>Item name/description</li>
                        <li>Photos showing the fault, the full item, and the Mozzify logo/label</li>
                    </ul>
                    <p>All claims for damaged or wrong items must be made within 7 days of the delivery date.</p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            },
            {
                id: 'thrift-plus',
                title: 'Thrift+',
                updatedAt: '3 years ago',
                content: `
                    <h3>What is Thrift+?</h3>
                    <p>Thrift+ is a donation and resale service we've partnered with in the UK for second-hand branded clothing. You can earn credits or donate to charity while giving a second life to your unwanted clothes.</p>
                    
                    <h3>How it works:</h3>
                    <ul>
                        <li><strong>ADD IT:</strong> Add a ThriftBag to your next order.</li>
                        <li><strong>SCAN IT:</strong> Scan the QR code to create an account.</li>
                        <li><strong>STUFF IT:</strong> Fill the bag with unwanted (good condition) clothes.</li>
                        <li><strong>SEND IT:</strong> Send it back to Thrift+ for resale.</li>
                    </ul>

                    <h3>More Questions?</h3>
                    <p>Visit the <a href="https://thrift.plus" target="_blank">Thrift+ website</a> or contact our support team.</p>
                `
            }
        ]
    },
    {
        id: 'payments',
        title: 'Payments & Promotions',
        articles: [
            {
                id: 'mozzi-club',
                title: 'Mozzi Club',
                updatedAt: '7 months ago',
                content: `
                    <p><strong>For the ones that show up.</strong></p>
                    <p>Join our Loyalty programme to unlock exclusive benefits and rewards by earning XP for interacting with Mozzify through buying product, completing workouts, or simply by signing up to our emails.</p>
                    <p>The more XP you earn, the higher you’ll climb through our loyalty tiers, unlocking exclusive benefits along the way!</p>

                    <h3>Mozzi Club FAQ's</h3>
                    <p><strong>What's the Loyalty programme?</strong> Mozzi Club is the programme that turns the work you put in and the things you buy into early access, exclusive invites and cheeky discounts.</p>
                    <p><strong>What is XP?</strong> XP is short for experience points that you’re rewarded with when you shop, share, and show up. Higher tiers = bigger rewards.</p>
                    
                    <h3>How do I earn XP?</h3>
                    <ul>
                        <li><strong>Shop:</strong> Earn XP when you spend on our website or the Mozzify app. Get 50XP just for downloading our app.</li>
                        <li><strong>Share:</strong> Sign up for our emails to earn 25XP.</li>
                        <li><strong>Show Up:</strong> Download our training app to earn XP for logging workouts.</li>
                    </ul>

                    <h3>Tier Status</h3>
                    <ul>
                        <li><strong>Tier 1:</strong> 0-1249XP</li>
                        <li><strong>Tier 2:</strong> 1250-2999 XP</li>
                        <li><strong>Tier 3:</strong> 3000-4999 XP</li>
                        <li><strong>Tier 4:</strong> 5000+ XP</li>
                    </ul>

                    <p>Once opted into, you can view your XP balance by visiting your profile page on our website or app.</p>
                `
            },
            {
                id: 'discounts',
                title: 'Discounts',
                updatedAt: '3 months ago',
                content: `
                    <h3>What Discounts are available at Mozzify?</h3>
                    <p>Sign up for our newsletter and get 10% off your first order, along with early access to product drops.</p>
                    <p><a href="/register">Sign me up</a></p>
                    <p><em>*Discount codes can't be 'stacked'. Only one discount code can be entered at checkout.</em></p>

                    <h3>Student & Military Discounts</h3>
                    <p>We've partnered with providers like Student Beans and UNiDAYS to offer verified students exclusive discounts. We also offer military discounts in select regions.</p>

                    <h3>Athlete Codes</h3>
                    <p>All our Mozzify athletes have unique discount codes. Support your favourite athlete and score 10% off your order at checkout!</p>

                    <h3>Troubleshooting</h3>
                    <p>If your code isn't working, ensure you are logged in, the code is still valid, and you don't already have sale items in your basket.</p>
                `
            },
            {
                id: 'refer-a-friend',
                title: 'Refer A Friend',
                updatedAt: 'a year ago',
                content: `
                    <h3>Refer a friend, earn a reward!</h3>
                    <p>Refer a friend to Mozzify and we'll give them a reward off their first order. Once they purchase, you'll receive a reward too!</p>
                    
                    <h3>How it works:</h3>
                    <ol>
                        <li>Purchase your fave 'fits via mozzify.com or the app.</li>
                        <li>Complete the Refer A Friend steps post-purchase.</li>
                        <li>Share your unique link with friends.</li>
                        <li>As soon as your friend places their first qualifying order, you'll receive your reward!</li>
                    </ol>

                    <p><em>*Offer valid in select regions only. Terms & conditions apply.</em></p>
                `
            },
            {
                id: 'payment-queries',
                title: 'Payment Queries',
                updatedAt: '2 years ago',
                content: `
                    <h3>Why am I receiving an error when trying to purchase?</h3>
                    <p>Common payment error codes:</p>
                    <ul>
                        <li><strong>2000 (Do not honour):</strong> Bank is unwilling to accept the transaction. Contact your bank.</li>
                        <li><strong>2007 (No Account):</strong> Submitted card number is not on file.</li>
                        <li><strong>2015 (Transaction not allowed):</strong> Bank declining for unspecified reasons.</li>
                    </ul>

                    <h3>International Banking Fees</h3>
                    <p>If shopping from outside our primary registration countries, your bank might apply a small international fee (usually 2-3%). This is charged by your bank, not Mozzify.</p>
                `
            },
            {
                id: 'price-changes',
                title: 'Price Changes',
                updatedAt: '3 years ago',
                content: `
                    <h3>Can I get a price adjustment?</h3>
                    <p>As an online retailer, our prices occasionally change based on demand, stock, and sales. Unfortunately, we are unable to adjust prices or offer refunds for the difference once an order has been placed.</p>
                    <p>We are also unable to retrospectively apply discount codes to existing orders.</p>
                `
            }
        ]
    },
    {
        id: 'technical',
        title: 'Technical',
        articles: [
            {
                id: 'accessing-account',
                title: 'Accessing My Mozzify Account',
                updatedAt: '2 years ago',
                content: `
                    <h3>Why should I get a Mozzify account?</h3>
                    <p>An Account is easy to create and allows you to access your account details and order history, start a return and edit your saved addresses for faster checkout!</p>

                    <h3>How do I create an account?</h3>
                    <ol>
                        <li>Hit the 'My Account' button in the menu.</li>
                        <li>Select the 'Create An Account' link.</li>
                        <li>Fill in the fields and click 'Create Account'.</li>
                    </ol>
                    <p><em>*Please note: placing an order doesn't automatically create an account.</em></p>

                    <h3>I can't log into my account?</h3>
                    <p>Getting an error? Check these first:</p>
                    <ul>
                        <li>Ensure you’re on the correct regional site.</li>
                        <li>Check you’re using the same email address you used to sign up.</li>
                        <li>Forgot your password? Reset it using the link on the login page.</li>
                    </ul>
                    <p>If you wish to change your email address, you'll need to create a new account.</p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            },
            {
                id: 'delete-account',
                title: 'Delete My Mozzify Account',
                updatedAt: '3 years ago',
                content: `
                    <h3>Want to delete your Mozzify account? No problem!</h3>
                    <p>If you want to delete your Mozzify account, please send us a message via the support channel.</p>
                    <p><strong>Deleting your account means:</strong></p>
                    <ul>
                        <li>You will not be able to log into your account on the website or app.</li>
                        <li>All order history associated with the account will be removed from your view.</li>
                        <li>You will lose access to loyalty progress and saved information.</li>
                    </ul>
                    <p><strong>Important Note:</strong> We may still need to keep some information for legal obligations (e.g. audit requirements, tax purposes) or to defend legal claims, as outlined in our Privacy Notice.</p>

                    <h3>More Questions?</h3>
                    <p>Please contact our support team <a href="/contact">here</a>.</p>
                `
            }
        ]
    },
    {
        id: 'product',
        title: 'Product',
        articles: [
            {
                id: 'womens-size-guide',
                title: "Women's Size Guide",
                updatedAt: 'a month ago',
                content: `
                    <h3>Womenswear Tops Size Chart</h3>
                    <p>To find your fit, please measure your chest, waist and hips using the guide below:</p>
                    <ul>
                        <li><strong>CHEST:</strong> Measure the full circumference of the chest 2.5cm below the underarm.</li>
                        <li><strong>WAIST:</strong> Measure the full circumference at the narrowest point of the waist.</li>
                        <li><strong>HIPS:</strong> Measure the full circumference at the widest point of the hips.</li>
                    </ul>

                    <h3>Sports Bras</h3>
                    <p><strong>UNDER BUST:</strong> Measure the full circumference under your bust for band size.</p>
                    <p><strong>BUST:</strong> Measure the full circumference around the fullest part of your bust for cup size.</p>
                    <p>Our dual-cup sizing covers two cup sizes (e.g., B/C fits a B or C cup), ideal for when you're in-between sizes.</p>

                    <h3>Womenswear Bottoms Size Chart</h3>
                    <ul>
                        <li><strong>WAIST:</strong> Measure at the narrowest point.</li>
                        <li><strong>HIPS:</strong> Measure the fullest part of your hips.</li>
                        <li><strong>INSIDE LEG:</strong> Measure from crotch to ankle.</li>
                    </ul>
                `
            },
            {
                id: 'footwear-size-guide',
                title: 'Footwear Size Guide',
                updatedAt: '5 months ago',
                content: `
                    <h3>SLIDES & FOOTWEAR</h3>
                    <p>Our size comparison chart includes UK, US & EU sizing to make finding your perfect fit easier.</p>
                    <ul>
                        <li><strong>Tight Fit:</strong> Size down.</li>
                        <li><strong>Loose Fit:</strong> Size up.</li>
                    </ul>
                    <p>We recommend choosing your usual size for most models as they run true to size.</p>
                `
            },
            {
                id: 'restock-info',
                title: 'When do items restock?',
                updatedAt: 'a year ago',
                content: `
                    <p>We can't always give a heads-up about restocks as they're subject to change. However, we have a "Notify Me" function on selected items.</p>
                    <h3>How to get notified:</h3>
                    <ol>
                        <li>Select the item and size you want.</li>
                        <li>Hit the 'Notify Me' button or enter your email.</li>
                        <li>We'll email you as soon as it's back!</li>
                    </ol>
                    <p>If you don't see the notification option, that particular item or size isn't currently planned for a restock.</p>
                `
            },
            {
                id: 'clothing-care',
                title: 'Clothing Care & Staying Sustainable',
                updatedAt: 'a year ago',
                content: `
                    <h3>Care Tips:</h3>
                    <ul>
                        <li><strong>Read the label:</strong> Always check the care label before washing.</li>
                        <li><strong>Wash inside out:</strong> Ensures a more thorough clean and protects the fabric surface.</li>
                        <li><strong>Cool Wash:</strong> Wash at 30°C or below to save energy and preserve your 'fits.</li>
                        <li><strong>Avoid Tumble Drying:</strong> Air dry to preserve elasticity, logos, and prints for longer.</li>
                    </ul>
                    <p>Hand wash accessories like bottles and shakers in cool water to avoid disfiguration.</p>
                `
            },
            {
                id: 'mens-size-guide',
                title: "Men's Size Guide",
                updatedAt: 'a year ago',
                content: `
                    <h3>Menswear Tops Size Chart</h3>
                    <ul>
                        <li><strong>CHEST:</strong> Measure 2.5cm below the underarm.</li>
                        <li><strong>WAIST:</strong> Measure at the narrowest point.</li>
                        <li><strong>HIPS:</strong> Measure at the fullest point.</li>
                    </ul>
                    <h3>Menswear Bottoms Size Chart</h3>
                    <ul>
                        <li><strong>WAIST:</strong> Narrowest point.</li>
                        <li><strong>HIPS:</strong> Fullest point.</li>
                        <li><strong>INSIDE LEG:</strong> From crotch to ankle.</li>
                    </ul>
                `
            },
            {
                id: 'sustainability',
                title: "What is Mozzify's commitment to sustainability?",
                updatedAt: '3 years ago',
                content: `
                    <p>Sustainability is a duty, not a trend. At Mozzify, we focus on three pillars: Our Planet, Our People, and Wear More, Waste Less.</p>
                    <ul>
                        <li><strong>Environment:</strong> Reducing impact through science-based targets and sustainable initiatives.</li>
                        <li><strong>Ethics:</strong> Respecting human rights and ensuring fair working conditions throughout our supply chain.</li>
                        <li><strong>Product:</strong> Committed to using recycled materials and designing for circularity (reuse and recycling).</li>
                    </ul>
                    <p>For UK customers, we've partnered with Thrift+ to give pre-loved items a second life.</p>
                `
            }
        ]
    },
    {
        id: 'general',
        title: 'General Information',
        articles: [
            {
                id: 'contact-us',
                title: 'Contact Us',
                updatedAt: '3 months ago',
                content: `
                    <h3>How do I contact Mozzify Support?</h3>
                    <p>The quickest way to contact us is via our chat widget located at the bottom right of this page.</p>
                    <ul>
                        <li>Open the chat widget icon.</li>
                        <li>Provide as much detail as possible to the Mozzify Bot.</li>
                        <li>If needed, the bot will connect you with a human agent.</li>
                    </ul>
                    <p>Please only start one conversation at a time to help us respond faster.</p>

                    <h3>How do I contact Mozzify by email?</h3>
                    <p>You can email us at <a href="mailto:support@mozzify.com">support@mozzify.com</a>. We typically aim to respond within 24-48 hours. Please include:</p>
                    <ul>
                        <li>Order number</li>
                        <li>Email address</li>
                        <li>Description of your issue</li>
                        <li>Supporting images</li>
                    </ul>

                    <h3>Why doesn't Mozzify have a phone number?</h3>
                    <p>Mozzify is an online-first brand, and our support is built to handle queries efficiently through digital channels. Our team is available 24/7 via the chat function!</p>
                `
            },
            {
                id: 'mozzify-athlete',
                title: 'KITAFY INFLUENCER',
                updatedAt: '7 months ago',
                content: `
                    <h3>How do I become a Mozzify athlete?</h3>
                    <p>We don't have set criteria, as all our athletes are unique. Our Partnerships Team regularly scouts talent whose values align with ours.</p>
                    <p>The best advice is to focus on your own path, identify what makes you unique, and inspire others. You must be 18+ to become an Athlete.</p>
                `
            },
            {
                id: 'fake-accounts',
                title: 'Fake Mozzify Accounts and Websites',
                updatedAt: 'a year ago',
                content: `
                    <h3>Don't get got!</h3>
                    <p>Counterfeiters are becoming skilled at creating fake ads and websites. Here's how to spot them:</p>
                    <ul>
                        <li><strong>Verified Tick:</strong> Look for the blue verification tick on social media. No tick? It's not us.</li>
                        <li><strong>Official URL:</strong> The only official website is <strong>mozzify.com</strong>. Avoid URLs like mozzify-norge.com or similar.</li>
                        <li><strong>Suspicious Offers:</strong> We will never ask for bank details for "product testing" or ask for inappropriate photos.</li>
                    </ul>
                    <p>If you suspect a site is fake, please report it to our team and your bank immediately.</p>
                `
            },
            {
                id: 'marketing-signup',
                title: 'Sign up to Marketing',
                updatedAt: 'a year ago',
                content: `
                    <h3>Want emails you'll actually want to read?</h3>
                    <p>Opt-in to our emails for:</p>
                    <ul>
                        <li>Latest updates on sales, discounts, and events.</li>
                        <li>Early details of new product launches.</li>
                        <li>Access to exclusive competitions and surprises.</li>
                    </ul>
                    <p>You can unsubscribe at any time if you change your mind!</p>
                `
            }
        ]
    }
];
