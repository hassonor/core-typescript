import {MatchReader} from "./MatchReader";
import {Summary} from "./Summary";
import {WinsAnalysis} from "./analyzers/WinsAnalysis";
import {HtmlReport} from "./reoportTargets/HtmlReport";
import {ConsoleReport} from "./reoportTargets/ConsoleReport";

const reader = new MatchReader("football.csv");
reader.read();

const summary_1 = new Summary(
    new WinsAnalysis('Liverpool'),
    new ConsoleReport()
);
summary_1.buildAndPrintReport(reader.data);

const summary_2 = Summary.winsAnalysisWithHtmlReport('Man United');
summary_2.buildAndPrintReport(reader.data);










