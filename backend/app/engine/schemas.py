from typing import List, Optional
from pydantic import BaseModel, Field

class InlineReviewComment(BaseModel):
    file_path: str = Field(description="The path of the file being reviewed.")
    line_number: int = Field(description="The line number where the issue exists.")
    severity: str = Field(description="INFO, WARNING, or CRITICAL.")
    issue_type: str = Field(description="Bug, Security, Performance, or Style.")
    comment: str = Field(description="Clear, actionable explanation with a fix suggestion.")
    suggested_code: Optional[str] = Field(None, description="Exact replacement code snippet if applicable.")

class PRReviewResult(BaseModel):
    summary: str = Field(description="Executive summary of the pull request changes.")
    overall_sentiment: str = Field(description="APPROVE, COMMENT, or REQUEST_CHANGES.")
    security_score: int = Field(description="Score between 0 and 100 based on vulnerabilities.")
    inline_comments: List[InlineReviewComment] = Field(default_factory=list)
