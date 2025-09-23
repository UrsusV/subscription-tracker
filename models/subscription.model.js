import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number']
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP'],
        default: 'USD'
    },
    frequency: {
        type: String,
        enum: ['monthly', 'yearly']
    },
    category: {
        type: String,
        enum: ['education', 'entertainment', 'music', 'sports', 'technology'],
        required: [true, 'Category is required']
    },
    paymentMethod: {
        type: String,
        required: [true, 'Payment method is required'],
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required'],
        validate: {
            validator: (value) => value <= Date.now(),
            message: 'Start date must be in the past'
        },
        default: Date.now
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: (value) => value >= this.startDate,
            message: 'Renewal date must be in the future'
        },
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required']
    }

}, { timestamps: true });

subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }
    
    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
