"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentInput = exports.updateBlogInput = exports.blogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
    name: zod_1.default.string()
});
exports.signinInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6),
});
exports.blogInput = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().min(2),
    published: zod_1.default.string().optional(),
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string().optional(),
    content: zod_1.default.string().optional(),
    published: zod_1.default.string().optional(),
});
exports.CommentInput = zod_1.default.object({
    comment: zod_1.default.string(),
});
