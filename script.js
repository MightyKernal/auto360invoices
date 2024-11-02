// Load the logo from a URL
const logoUrl = 'https://media.istockphoto.com/id/1408605259/vector/auto-sports-vehicle-silhouette.jpg?s=612x612&w=0&k=20&c=--lwIV-ayDVrjistgR22-B9xFic1xsAusMxxzu6Mjhw='; // Replace with your logo URL

document.addEventListener('DOMContentLoaded', function() {
    const invoiceDateInput = document.getElementById('invoice-date');
    const dueDateInput = document.getElementById('due-date');

    // Set the current date as default for invoice date
    const today = new Date();
    invoiceDateInput.value = today.toISOString().split('T')[0];

    // Set the due date to 7 days from today
    const dueDate = new Date();
    dueDate.setDate(today.getDate() + 14);
    dueDateInput.value = dueDate.toISOString().split('T')[0];
});


// Event listener for form submission
document.getElementById('invoice-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const logo = new Image();
    logo.crossOrigin = "Anonymous"; // Ensure CORS is handled
    logo.src = logoUrl;

    logo.onload = function() {
        // Collect invoice information
        const invoiceTo = document.getElementById('invoice-to').value;
        const clientEmail = document.getElementById('client-email').value;
        const regoNumber = document.getElementById('rego-number').value; // Collecting rego number
        const invoiceNumber = document.getElementById('invoice-number').value;
        
        // Collect item information
        const items = document.querySelectorAll('.item');
        let itemsHtml = '';
        let totalAmount = 0;
        let partCost = 0;
        let labourCost = 0;

        items.forEach(item => {
            const description = item.querySelector('.item-description').value;
            const part = parseFloat(item.querySelector('.item-part').value);
            const labour = parseFloat(item.querySelector('.item-labour').value);
            const itemTotal = part + labour;
            totalAmount += itemTotal;
            partCost += part;
            labourCost += labour;

            itemsHtml += `
                <tr style="border-bottom: 1px solid #ccc;">
                    <td style="padding: 5px; border-right: 1px solid #ccc;">${description}</td>
                    <td style="padding: 5px; text-align: center; border-right: 1px solid #ccc;">${part.toFixed(2)}</td>
                    <td style="padding: 5px; text-align: center; border-right: 1px solid #ccc;">${labour.toFixed(2)}</td>
                    <td style="padding: 5px; text-align: right;">$${itemTotal.toFixed(2)}</td>
                </tr>
            `;
        });

        // Collect bank information
        const bankName = document.getElementById('bank-name').value;
        const bsb = document.getElementById('bsb').value;
        const accountNumber = document.getElementById('account-number').value;

        // Collect payment method and notes
        const paymentMethod = document.getElementById('payment-method').value;
        const invoiceNotes = document.getElementById('invoice-notes').value;

        const invoiceDate = document.getElementById('invoice-date').value;
        const dueDate = document.getElementById('due-date').value;

        let paymentMethodHtml = '';
        if (paymentMethod !== "none") {
            paymentMethodHtml = `
            <div style="margin-top: 50px;">
                <p><strong>Payment Method</strong></p>
                <p>${paymentMethod}</p>
            </div>    
            `;
        }

        let notesHtml = '';
        if (invoiceNotes) {
            notesHtml = `
            <div style="margin-top: 50px;">
                <h3>Notes</h3>
                <p>${invoiceNotes}</p>
            </div>
            `;
        }

        // Generate invoice HTML
        const invoiceHtml = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <img src="${logoUrl}" alt="Business Logo" style="max-width: 150px; height: auto;">
                <div style="text-align: right;">
                    <h2 style="color: #ff7a01;">INVOICE</h2>
                    <h2 style="color: #ff7a01;">Auto360 Solutions</h2>
                    <p>0452500491</p>
                    <p>0401080385</p>
                    <p>auto360solutions@outlook.com</p>
                    <p>www.auto360solutions.com.au</p>
                    <p style="color: #ff7a01; font-weight: bold;">ABN No: 14580409238</p>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px;">
                <div>
                    <p><strong>Invoice To:</strong> ${invoiceTo}</p>
                    <p><strong>Rego Number:</strong> ${regoNumber}</p>
                    <p><strong>Email:</strong> ${clientEmail}</p>
                    <p><strong>Invoice #:</strong> ${invoiceNumber}</p>
                </div>
                
                <div style="text-align: right;">
                    <p><strong>Invoice Date:</strong> ${invoiceDate}</p>
                    <p><strong>Due Date:</strong> ${dueDate}</p>
                </div>
            </div>

           
            <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: #f0f0f0;">
                        <th style="padding: 10px; border: 1px solid #ccc;">Item Description</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Part</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Labour</th>
                        <th style="padding: 10px; border: 1px solid #ccc;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHtml}
                    <tr>
                        <td colspan="3" style="text-align:right; padding: 10px;">Total Part Cost:</td>
                        <td style="padding: 5px; text-align: right;"><strong>$${partCost.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align:right; padding: 10px;">Total Labour Cost:</td>
                        <td style="padding: 5px; text-align: right;"><strong>$${labourCost.toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align:right; padding: 10px;">GST(10%):</td>
                        <td style="padding: 5px; text-align: right;"><strong>$${(totalAmount * 0.10).toFixed(2)}</strong></td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align:right; padding: 10px;"><strong>Total Amount:</strong></td>
                        <td style="padding: 5px; text-align: right;"><strong>$${(totalAmount + (totalAmount * 0.10)).toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>
            <div style="margin-top: 50px;">
                <p><strong>Bank Information</strong></p>
                <p>Bank Name: ${bankName}</p>
                <p>BSB: <span style="color: red;">${bsb}</span></p>
                <p>Account No: <span style="color: red;">${accountNumber}</span></p>
            </div>
            ${paymentMethodHtml}
            ${notesHtml}
        `;

        // Display the invoice output
        const invoiceContent = document.getElementById('invoice-content');
        invoiceContent.innerHTML = invoiceHtml;
        document.getElementById('invoice-output').style.display = 'block';

        // Add download PDF functionality
        document.getElementById('download-pdf').onclick = function() {
            const { jsPDF } = window.jspdf;

            const pdf = new jsPDF();
            const imgWidth = 190; // Width of the image in PDF

            // Generate the canvas
            html2canvas(invoiceContent).then(canvas => {
                const imgData = canvas.toDataURL("image/png");
                const imgHeight = canvas.height * imgWidth / canvas.width;

                // Add the invoice image to the PDF
                pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);

                // Add the logo to the PDF on the left
                pdf.addImage(logoUrl, 'JPEG', 10, 10, 30, 30); // Position logo at (10, 10) with width 30 and height 30

                // Save the PDF
                pdf.save(`Invoice_${regoNumber}.pdf`);
            }).catch(err => {
                console.error("Failed to download PDF:", err);
            });
        };
    };

    logo.src = logoUrl;
});

// Add new item functionality
document.getElementById('add-item').addEventListener('click', function() {
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    newItem.innerHTML = `
        <label for="item-description">Item:</label>
        <input type="text" class="item-description" placeholder="Description of the item" required>
        
        <label for="item-part">Part:</label>
        <input type="number" class="item-part" min="0" step="0.01" placeholder="0.00" required>
        
        <label for="item-labour">Labour:</label>
        <input type="number" class="item-labour" min="0" step="0.01" placeholder="0.00" required>
        
        <button type="button" class="remove-item">Remove</button>
    `;
    document.getElementById('items-container').appendChild(newItem);

    // Remove item functionality
    newItem.querySelector('.remove-item').addEventListener('click', function() {
        newItem.remove();
    });
});


