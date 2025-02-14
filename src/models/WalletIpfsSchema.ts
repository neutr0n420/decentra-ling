import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true,
        unique: true,
    },
    cids: [{
        type: String,
        required: false,
    }],
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

walletSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
})
// walletSchema.index({ address: 1 }, { unique: true });
// walletSchema.index({ cids: 1 });

const Wallet = mongoose.models.Wallet || mongoose.model('Wallet', walletSchema);
export default Wallet;

