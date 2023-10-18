import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: [true, 'Project name is required!'],
    },
    attachments: {
      type: Array,
      default: []
    },
    description: {
      type: String,
      required: [true, 'Project description is required!'],
    },
    link: {
      type: String,
    },
    projectType: {
      type: String,
    },
    userId: {
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
